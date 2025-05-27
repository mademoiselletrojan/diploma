const fs = require('fs');
const path = require('path');

// Папки и файлы, которые нужно игнорировать
const IGNORE_FOLDERS = new Set(['.git', '__pycache__', 'node_modules', '.vscode']);

function writeStructure(startPath, outputStream, prefix = '') {
    const entries = fs.readdirSync(startPath).sort();
    let count = 0;

    for (const entry of entries) {
        const fullPath = path.join(startPath, entry);

        // Пропускаем игнорируемые папки
        if (fs.statSync(fullPath).isDirectory() && IGNORE_FOLDERS.has(entry)) continue;
        count++;
    }

    let index = 0;
    for (const entry of entries) {
        const fullPath = path.join(startPath, entry);
        const isDirectory = fs.statSync(fullPath).isDirectory();

        // Пропуск игнорируемых папок
        if (isDirectory && IGNORE_FOLDERS.has(entry)) continue;

        const isLast = ++index === count;
        const connector = isLast ? '└── ' : '├── ';
        const name = entry + (isDirectory ? '/' : '');

        outputStream.write(`${prefix}${connector}${name}\n`);

        if (isDirectory) {
            const subPrefix = prefix + (isLast ? '    ' : '│   ');
            writeStructure(fullPath, outputStream, subPrefix);
        }
    }
}

function generateProjectStructure(outputFilename = 'structure.txt') {
    const outputPath = path.resolve(process.cwd(), outputFilename);
    const outputStream = fs.createWriteStream(outputPath, { encoding: 'utf-8' });

    const projectName = path.basename(process.cwd());
    outputStream.write(`Проектная структура (${projectName})\n`);
    outputStream.write('='.repeat(50) + '\n\n');

    writeStructure(process.cwd(), outputStream);

    outputStream.end();
    console.log(`✅ Структура проекта успешно сохранена в ${outputFilename}`);
}

// Запуск скрипта
generateProjectStructure();