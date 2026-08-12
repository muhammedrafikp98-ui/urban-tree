const path = require('path');
const fs = require('fs');
const { convertFolderToWebPNode } = require('./convert-to-webp.js');

async function main() {
  const workshopsDir = path.join(__dirname, '../assets/workshops');

  console.log('Converting linocut printing images in', workshopsDir);
  await convertFolderToWebPNode(workshopsDir, workshopsDir, 85);

  const mappings = [
    { origWebp: 'Linocut printed journal.webp', finalWebp: 'linocut-printed-journal.webp', origImage: 'Linocut printed journal.jpeg' },
    { origWebp: 'Logo stamp.webp', finalWebp: 'linocut-logo-stamp.webp', origImage: 'Logo stamp.jpeg' },
    { origWebp: 'Packaging stamps.webp', finalWebp: 'linocut-packaging-stamp.webp', origImage: 'Packaging stamps.jpeg' },
    { origWebp: 'Tote bag..webp', finalWebp: 'linocut-tote-bag.webp', origImage: 'Tote bag..jpeg' },
  ];

  for (const item of mappings) {
    const origWebpPath = path.join(workshopsDir, item.origWebp);
    const finalWebpPath = path.join(workshopsDir, item.finalWebp);
    const origImagePath = path.join(workshopsDir, item.origImage);

    if (fs.existsSync(origWebpPath)) {
      fs.renameSync(origWebpPath, finalWebpPath);
      console.log(`Renamed: ${item.origWebp} -> ${item.finalWebp}`);
    }

    if (fs.existsSync(origImagePath)) {
      fs.unlinkSync(origImagePath);
      console.log(`Deleted original image: ${item.origImage}`);
    }
  }

  console.log('Linocut printing images conversion completed successfully!');
}

main().catch(err => console.error(err));
