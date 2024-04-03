# SecureAuth

SecureAuth - Security Made Simple, Authentication Made Strong made with `NextJS` (frontend and backend) and `MongoDB` (database)

## Table of Contents

- [Installation](#installation)
- [Defining env variables](#defining-environment-variables)
- [Run dev environment](#run-dev-environment)

## Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:Samya-S/SecureAuth.git
    ```
    `Make sure you have SSH keys setup in your machine`

2. Navigate to the project directory:

    ```bash
    cd secureauth
    ```

3. Install dependencies:

    ```bash
    npm install
    ```
    or alternatively
   ```bash
   npm i
   ```
   `Make sure to have nodejs and npm installed`

## Defining environment variables

Create a `.env` file and define the following environment variables:

```bash
mongoURI = '<your mongodb url>'
NEXT_PUBLIC_hostingDomain = '<your localhost domain>'
secretToken = '<a random secret token for jwt>'
```

## Run dev environment

Run the development server:

```bash
npm run dev
```
or
```bash
yarn dev
```
or
```bash
pnpm dev
```
or
```bash
bun dev
```
