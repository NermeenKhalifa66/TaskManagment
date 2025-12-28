const db = require('./db');

// عرض كل المستخدمين
console.log('--- Users ---');
db.all('SELECT * FROM users', (err, users) => {
  if (err) return console.error('Error fetching users:', err);
  console.table(users);
});

// عرض كل المهام
console.log('--- Tasks ---');
db.all('SELECT * FROM tasks', (err, tasks) => {
  if (err) return console.error('Error fetching tasks:', err);
  console.table(tasks);
});
