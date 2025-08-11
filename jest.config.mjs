/**
 * @format
 * @type {import('jest').Config}
 */

export default {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/src/test/mocks/fileMock.js',
		'\\.(css|less|scss|sass)$': '<rootDir>/src/test/mocks/styleMock.js',
	},
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': [
			'babel-jest',
			{ presets: ['@babel/preset-env', '@babel/preset-react'] },
		],
	},
	transformIgnorePatterns: ['/node_modules/(?!(@mui)/)'],
	testEnvironmentOptions: {
		customExportConditions: [''],
	},
};
