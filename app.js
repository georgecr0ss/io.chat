const Task = require('data.task');

Task.of(1)
    .map(x => x + 1)
    .chain(x => Task.of(x + 1))
    .fork(e => console.log('err', e),
        x => console.log('success', x))