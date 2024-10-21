// lint-staged.config.mjs

export default {
  '**/*.{js,jsx,ts,tsx,vue,css,scss,md}': (filenames) => [
    		`prettier --write ${filenames.join(' ')}`,
    'git add',
  ],
};
