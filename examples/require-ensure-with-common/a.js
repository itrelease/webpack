var dep = require('./common-dep1.js');
// var depA = require('./depA.js');

window.addEventListener('click', function () {
  require.ensure([], function (require) {
    var runtime = require('./load_in_runtime1.js');

    console.log(runtime);
  });
}, false);

window.onload = function () {
	require.ensure([], function (require) {
		var runtime = require('./load_in_runtime2.js');

		console.log(runtime);
	});
};

module.exports = {
  name: dep.getName('a name')
  // lastName: depA.getLastName('a lastname')
};
