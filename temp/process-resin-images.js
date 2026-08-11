const path = require('path');
const fs = require('fs');
const { convertFolderToWebPNode } = require('./convert-to-webp.js');

async function main() {
  const workshopsDir = path.join(__dirname, '../assets/workshops');

  console.log('Converting resin art images in', workshopsDir);
  await convertFolderToWebPNode(workshopsDir, workshopsDir, 85);

  const mappings = [
    { origWebp: 'Clock.webp', finalWebp: 'resin-wall-clock.webp', origImage: 'Clock.jpeg' },
    { origWebp: 'Coffe table.webp', finalWebp: 'resin-coffee-table.webp', origImage: 'Coffe table.jpeg' },
    { origWebp: 'Resin bookmark.webp', finalWebp: 'resin-bookmark.webp', origImage: 'Resin bookmark.jpeg' },
    { origWebp: 'Resin coasters.webp', finalWebp: 'resin-coasters.webp', origImage: 'Resin coasters.jpeg' },
    { origWebp: 'Resin jewellery.webp', finalWebp: 'resin-jewellery.webp', origImage: 'Resin jewellery.jpeg' },
    { origWebp: 'Riverside table.webp', finalWebp: 'resin-river-table.webp', origImage: 'Riverside table.jpeg' },
    { origWebp: 'Side table.webp', finalWebp: 'resin-side-table.webp', origImage: 'Side table.jpeg' },
    { origWebp: 'Trinket tray.webp', finalWebp: 'resin-trinket-tray.webp', origImage: 'Trinket tray.jpeg' },
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

  console.log('Resin art images conversion completed successfully!');
}

main().catch(err => console.error(err));
