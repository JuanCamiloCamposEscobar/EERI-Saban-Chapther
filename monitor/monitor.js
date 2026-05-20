// monitor/monitor.js
import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

// ------------------------------------------------------------------
// Config
// ------------------------------------------------------------------
const APP_URL = 'http://localhost:4173'; // Vite preview/dev default
const VIDEO_DIR = path.resolve('monitor/video');
const REPORT_PATH = path.resolve('monitor/report.txt');
const SUPABASE_HOST = /supabase\.co|supabase\.io/;

fs.mkdirSync(VIDEO_DIR, { recursive: true });

(async () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const videoPath = path.join(VIDEO_DIR, `supabase-errors-${timestamp}.mp4`);

  // Start ffmpeg screen capture (captures whole screen; ffmpeg-static provides binary)
  const ffmpeg = spawn(
    ffmpegPath,
    [
      '-y',
      '-f', 'gdigrab', // Windows screen grab
      '-framerate', '30',
      '-i', 'desktop',
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      '-pix_fmt', 'yuv420p',
      videoPath,
    ],
    { stdio: 'ignore' }
  );

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'],
  });
  const page = await browser.newPage();

  // Helper to write report and stop recording
  async function handleError(source, details, consoleMsg = null) {
    ffmpeg.kill('SIGINT'); // finalize video

    const lines = [];
    lines.push('=== SUPABASE ERROR DETECTED ===');
    lines.push(`Timestamp : ${new Date().toISOString()}`);
    lines.push(`Source    : ${source}`);
    lines.push(`Details   : ${details}`);
    if (consoleMsg && consoleMsg.stackTrace) {
      const stack = consoleMsg.stackTrace
        .map(fr => `${fr.url}:${fr.lineNumber}`)
        .join(' → ');
      if (stack) lines.push(`StackTrace: ${stack}`);
    }
    lines.push(`Video capture saved at: ${videoPath}`);
    lines.push('=== END REPORT ===\n');

    fs.appendFileSync(REPORT_PATH, lines.join('\n'));
    console.log('Supabase error captured – report written to', REPORT_PATH);
  }

  // Listen for console messages
  page.on('console', async msg => {
    const text = msg.text();
    if (SUPABASE_HOST.test(text) && /(401|403|Failed to fetch)/i.test(text)) {
      await handleError('console', text, msg);
    }
  });

  // Listen for failed network requests
  page.on('requestfailed', async request => {
    const url = request.url();
    const failure = request.failure();
    if (SUPABASE_HOST.test(url) && /(401|403|Failed to fetch)/i.test(failure?.errorText || '')) {
      await handleError('network', `${url} → ${failure?.errorText}`);
    }
  });

  await page.goto(APP_URL, { waitUntil: 'networkidle2' });
  // Keep alive until user closes the browser (Ctrl+C will also stop the script)
  await page.waitForTimeout(0);
})();
