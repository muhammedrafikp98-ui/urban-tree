const path = require('path');
const fs = require('fs');
const { convertFolderToWebPNode } = require('./convert-to-webp.js');

async function main() {
  const workshopsDir = path.join(__dirname, '../assets/workshops');

  console.log('Converting hand painting images in', workshopsDir);
  await convertFolderToWebPNode(workshopsDir, workshopsDir, 85);

  const mappings = [
    { origWebp: 'Handpainted Planter.webp', finalWebp: 'hand-painting-planter.webp', origImage: 'Handpainted Planter.jpeg' },
    { origWebp: 'Jewellery Box.webp', finalWebp: 'hand-painting-jewellery-box.webp', origImage: 'Jewellery Box.jpeg' },
    { origWebp: 'Lamp.webp', finalWebp: 'hand-painting-lamp.webp', origImage: 'Lamp.jpeg' },
    { origWebp: 'Mirror Frame.webp', finalWebp: 'hand-painting-mirror-frame.webp', origImage: 'Mirror Frame.jpeg' },
    { origWebp: 'Serving Tray.webp', finalWebp: 'hand-painting-serving-tray.webp', origImage: 'Serving Tray.jpeg' },
    { origWebp: 'Shelf.webp', finalWebp: 'hand-painting-shelf.webp', origImage: 'Shelf.jpeg' },
    { origWebp: 'Tissue Box.webp', finalWebp: 'hand-painting-tissue-box.webp', origImage: 'Tissue Box.jpeg' },
    { origWebp: 'Wall Plate.webp', finalWebp: 'hand-painting-wall-plate.webp', origImage: 'Wall Plate.jpeg' },
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

  console.log('Hand painting images conversion completed successfully!');
}

main().catch(err => console.error(err));
