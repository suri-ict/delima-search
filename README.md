
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

# Delima Quick Search

A simple, easy-to-use website for finding and copying accounts. "You can log in".





## Demo

username: test
password: 1234

[View Demo](https://delima-search.vercel.app)

## Run Locally

Clone the project

```bash
  git clone git@github.com:suri-ict/delima-search.git my-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```



## Checklist

You need a [Github](https://github.com/join) and [Vercel](https://vercel.com/signup) account setup.

- [ ] In `src/records/delima.ts`, replace with your data in js array form with object properties `name`, `prefix`, and `email`. For example,

```javascript
export const delima = [
    {
		name: 'NAMA',
		prefix: 'KPM-Guru',
		email: 'g-12345678@moe-dl.edu.my'
	}
]
```
- [ ] Change the title in `app.html`
- [ ] Replace the `favicon.svg`  file in `src` folder
- [ ] Create a `.env` file in the root folder, change the `test` and `1234` for username and password. You can add more user.

```
USERS="[{"username":"test","password":"1234"}]" 
```

- [ ] Commit your changes to Github.


## Deployment

To deploy this project, Go to [Vercel](https://vercel.com/new). Don't forget to add environment variable as in `.env` in the setting.


## Authors

- [@suri-ict](https://www.github.com/suri-ict)



## License

- [MIT](https://choosealicense.com/licenses/mit/)

