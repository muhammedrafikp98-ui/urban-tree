const path = require('path');
const fs = require('fs');
const { convertFolderToWebPNode } = require('./convert-to-webp.js');

async function main() {
  const workshopsDir = path.join(__dirname, '../assets/workshops');

  console.log('Converting cyanotype images in', workshopsDir);
  await convertFolderToWebPNode(workshopsDir, workshopsDir, 85);

  const mappings = [
    { origWebp: 'Book Mark Set.webp', finalWebp: 'cyanotype-bookmark-set.webp', origImage: 'Book Mark Set.jpeg' },
    { origWebp: 'Botanical Wall Art.webp', finalWebp: 'cyanotype-botanical-wall-art.webp', origImage: 'Botanical Wall Art.jpeg' },
    { origWebp: 'Fabric Pouch.webp', finalWebp: 'cyanotype-fabric-pouch.webp', origImage: 'Fabric Pouch.jpeg' },
    { origWebp: 'Greeting Cards.webp', finalWebp: 'cyanotype-greeting-cards.webp', origImage: 'Greeting Cards.jpeg' },
    { origWebp: 'Journal Cover.webp', finalWebp: 'cyanotype-journal-cover.webp', origImage: 'Journal Cover.jpeg' },
    { origWebp: 'Scarf.webp', finalWebp: 'cyanotype-scarf.webp', origImage: 'Scarf.jpeg' },
    { origWebp: 'Table Runner.webp', finalWebp: 'cyanotype-table-runner.webp', origImage: 'Table Runner.jpeg' },
    { origWebp: 'Tote Bag.webp', finalWebp: 'cyanotype-tote-bag.webp', origImage: 'Tote Bag.jpeg' },
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

  console.log('Cyanotype printing images conversion completed successfully!');
}

main().catch(err => console.error(err));
