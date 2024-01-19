const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimize() {
    const images = fs.readdirSync(path.resolve('public', 'old'));
    const total = images.length;

    let i = 0;
    for (const filename of images) {
        i++;
        const imagePath = path.resolve('public', 'old', filename);
        const parsed = path.parse(filename);
        await sharp(imagePath)
            .webp({
                // lossless: true,
                quality: 85,
            })
            .toFile(path.resolve('public', 'optimized', `${parsed.name}.webp`));
        console.log(i, 'optimized');
        console.log(`${total - i} lefts`);
    }
}

module.exports = optimize();
