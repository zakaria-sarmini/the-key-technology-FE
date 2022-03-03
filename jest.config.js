module.exports = {
	globals: {
		__TEST__: true,
	},
	testURL: 'http://localhost/',
	roots: ['<rootDir>'],
	modulePaths: ['<rootDir>', 'node_modules'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	cacheDirectory: '.jest/',
	snapshotSerializers: ['enzyme-to-json/serializer'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	setupFilesAfterEnv: [
		'./jest-setup.js'
	],
	testEnvironment: "jsdom"
};
