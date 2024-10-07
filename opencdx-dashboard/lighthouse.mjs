import lighthouse from 'lighthouse';
import fs from 'fs';
import * as chromeLauncher from 'chrome-launcher';

const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});

// `.report` is the HTML report as a string
const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['accessibility'],
    port: chrome.port,
    audits: [
        'accessibility/color-contrast',
        'accessibility/aria-allowed-attr',
        'accessibility/aria-required-attr',
        'accessibility/aria-required-children',
        'accessibility/aria-required-parent',
        'accessibility/aria-roles',
        'accessibility/aria-valid-attr-value',
        'accessibility/aria-valid-attr',
        'accessibility/audio-caption',
        'accessibility/button-name',
        'accessibility/bypass',
        'accessibility/definition-list',
        'accessibility/document-title',
        'accessibility/duplicate-id',
        'accessibility/frame-title',
        'accessibility/html-has-lang',
        'accessibility/html-lang-valid',
        'accessibility/image-alt',
        'accessibility/input-image-alt',
        'accessibility/label',
        'accessibility/layout-table',
        'accessibility/link-name',
        'accessibility/list',
        'accessibility/listitem',
        'accessibility/meta-refresh',
        'accessibility/meta-viewport',
        'accessibility/object-alt',
        'accessibility/tabindex',
        'accessibility/td-headers-attr',
        'accessibility/th-has-data-cells',
        'accessibility/valid-lang',
        'accessibility/video-caption',
        'accessibility/video-description',
        // Add more a11y rules as needed
    ]
};

const runnerResult = await lighthouse('http://localhost:3000/form-builder', options);
const reportHtml = runnerResult.report;
fs.writeFileSync('lhreport.html', reportHtml);

// `.lhr` is the Lighthouse Result as a JS object
console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
console.log('Performance score was', runnerResult.lhr.categories);

chrome.kill();
// async function runLighthouse(url) {
//   const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
//   const options = {
//     logLevel: 'info',
//     output: 'html',
//     onlyCategories: ['lighthouse'],
//     port: chrome.port,
//   };

//   const runnerResult = await lighthouse(url, options);
//   const reportHtml = runnerResult.report;

//   try {
//     fs.writeFileSync('lhreport.html', reportHtml);
//     console.log('Report saved to lhreport.html');
//   } catch (error) {
//     console.error('Error writing report:', error);
//   }

//   chrome.kill();
//   return runnerResult.lhr;
// }

// // Example usage with proper asynchronous handling
// runLighthouse('http://localhost:3000')
//   .then(report => {
//     console.log('Lighthouse report:', report);
//   })
//   .catch(error => {
//     console.error('Error running Lighthouse:', error);
//   });