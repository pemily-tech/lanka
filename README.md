## 🎯 Getting started

### 1. Clone this template

```bash
git clone
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create `.env` file.

### 4. Prepare husky

It is required if you want husky to work

```bash
pnpm run prepare
```

### 5. Run the dev server

You can start the server using this command:

```bash
pnpm run dev
```

and open http://localhost:3000/ to see this app.

## 📁 Project structure

```bash
.
├── .github                         # GitHub folder
├── .husky                          # Husky configuration
├── prisma                          # Prisma schema and migrations
├── public                          # Public assets folder
└── src
    ├── __tests__                   # Unit and e2e tests
    ├── actions                     # Server actions
    ├── app                         # Next JS App (App Router)
    ├── components                  # React components
    ├── hooks                       # Custom hooks
    ├── lib                         # Functions and utilities
    ├── styles                      # Styles folder
    ├── types                       # Type definitions
    ├── messages                    # Messages for i18n
    ├── paraglide                   # (generated) compiled i18n messages
    └── env.mjs                     # Env variables config file
```

## ⚙️ Scripts overview

The following scripts are available in the `package.json`:

- `dev`: Run development server
- `build`: Build the app
- `start`: Run production server
- `preview`: Run `build` and `start` commands together
- `lint`: Lint the code using Eslint
- `lint:fix`: Fix linting errors
- `format:check`: Checks the code for proper formatting
- `format:write`: Fix formatting issues
- `typecheck`: Type-check TypeScript without emitting files
- `test`: Run unit tests
- `test:watch`: Run unit tests in watch mode
- `e2e`: Run end-to-end tests
- `e2e:ui`: Run end-to-end tests with UI
- `postbuild`: Generate sitemap
- `prepare`: Install Husky for managing Git hooks
