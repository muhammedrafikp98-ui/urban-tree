const path = require('path');
const fs = require('fs');
const { convertFolderToWebPNode } = require('./convert-to-webp.js');

async function main() {
  const workshopsDir = path.join(__dirname, '../assets/workshops');
  
  console.log('Running convertFolderToWebPNode...');
  await convertFolderToWebPNode(workshopsDir, workshopsDir, 85);

  const mappings = [
    { origWebp: 'Trinket trey.webp', finalWebp: 'mirror-mosaic-trinket-tray.webp', origImage: 'Trinket trey.jpeg' },
    { origWebp: 'Coaster set.webp', finalWebp: 'mirror-mosaic-coaster-set.webp', origImage: 'Coaster set.jpeg' },
    { origWebp: 'Mirror frame.webp', finalWebp: 'mirror-mosaic-mirror-frame.webp', origImage: 'Mirror frame.jpeg' },
    { origWebp: 'Portrait frame.webp', finalWebp: 'mirror-mosaic-photo-frame.webp', origImage: 'Portrait frame.jpeg' },
    { origWebp: 'Planter.webp', finalWebp: 'mirror-mosaic-planter.webp', origImage: 'Planter.jpeg' },
    { origWebp: 'Side table.webp', finalWebp: 'mirror-mosaic-side-table.webp', origImage: 'Side table.jpeg' },
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

  console.log('Processing completed!');
}

main().catch(err => console.error(err));
