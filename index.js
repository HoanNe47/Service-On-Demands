const simpleGit = require('simple-git');
const moment = require('moment');
const jsonfile = require('jsonfile');
const random = require('random');

const FILE_PATH = './data.json';
const git = simpleGit();

const makeCommit = async (n) => {
  if (n === 0) return;

  const DATE = moment().subtract(n, 'd').format();
  const data = {
    date: DATE,
    message: `Commit ngày ${DATE}`,
  };

  jsonfile.writeFile(FILE_PATH, data, () => {
    git.add('./*')
      .then(() => git.commit(`Commit ngày ${DATE}`, { '--date': DATE }))
      .then(() => {
        console.log(`✅ Commit thành công: ${DATE}`);
        makeCommit(n - 1);
      });
  });
};

makeCommit(random.int(10, 30)); // Tùy chọn số ngày commit ngẫu nhiên
