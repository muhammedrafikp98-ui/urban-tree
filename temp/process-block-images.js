const path = require('path');
const fs = require('fs');
const { convertFolderToWebPNode } = require('./convert-to-webp.js');

async function main() {
  const workshopsDir = path.join(__dirname, '../assets/workshops');

  console.log('Converting images in', workshopsDir);
  await convertFolderToWebPNode(workshopsDir, workshopsDir, 85);

  const mappings = [
    { origWebp: 'Apron.webp', finalWebp: 'block-apron.webp', origImage: 'Apron.jpeg' },
    { origWebp: 'Cushion cover.webp', finalWebp: 'block-cushion-cover.webp', origImage: 'Cushion cover.jpeg' },
    { origWebp: 'Fabric pouch.webp', finalWebp: 'block-fabric-pouch.webp', origImage: 'Fabric pouch.jpeg' },
    { origWebp: 'Journal cover.webp', finalWebp: 'block-journal-cover.webp', origImage: 'Journal cover.jpeg' },
    { origWebp: 'Table runner.webp', finalWebp: 'block-table-runner.webp', origImage: 'Table runner.jpeg' },
    { origWebp: 'Tea towel.webp', finalWebp: 'block-tea-towel.webp', origImage: 'Tea towel.jpeg' },
    { origWebp: 'Tote Bag.webp', finalWebp: 'block-tote-bag.webp', origImage: 'Tote Bag.jpeg' },
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

  console.log('Block printing images conversion completed successfully!');
}

main().catch(err => console.error(err));
