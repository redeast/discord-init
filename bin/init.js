#! /usr/bin/env node
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

if (process.argv.length < 3) {
  console.log('\x1b[31m' + 'You have to provide a name to your project.')
  console.log('\x1b[33m' + 'For example :')
  console.log('\x1b[33m' + '    npx discord-init my-discord-bot')
  process.exit(1)
}

const currentPath = process.cwd()
const projectPathName = process.argv[2]
const projectPath = path.join(currentPath, projectPathName)

const paths = projectPath.split('\\')
const projectName = paths[paths.length - 1]

try {
  if (projectPathName !== '.') {
    fs.mkdirSync(projectPath)
  }
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(
      '\x1b[31m' +
        `The file "${projectName}" already exist in the current directory, please give it another name.`
    )
  } else {
    console.log(error)
  }
  process.exit(1)
}

async function main() {
  try {
    console.log('Creating Files...')
    fs.writeFileSync(
      path.join(projectPath, 'package.json'),
      `{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "",
  "main": "bot.js",
  "dependencies": {
    "discord.js": "^12.5.3",
    "@discordjs/opus": "^0.5.3"
  },
  "devDependencies": {
    "eslint": "^7.30.0",
    "nodemon": "^2.0.11"
  },
  "scripts": {
    "start": "node bot.js",
    "dev": "nodemon bot.js"
  },
  "license": "MIT"
}
`
    )

    fs.writeFileSync(
      path.join(projectPath, 'config.json'),
      `{
  "prefix": "!",
  "token": "yourtoken"
}
`
    )

    fs.writeFileSync(
      path.join(projectPath, '.eslintrc'),
      `{
  "extends": "eslint:recommended",
  "env": {
    "node": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 2021
  },
  "rules": {
    "brace-style": ["off", "stroustrup", { "allowSingleLine": true }],
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": "error",
    "comma-style": "error",
    "curly": ["error", "multi-line", "consistent"],
    "dot-location": ["error", "property"],
    "handle-callback-err": "off",
    "indent": ["off", "tab"],
    "max-nested-callbacks": ["error", { "max": 4 }],
    "max-statements-per-line": ["error", { "max": 2 }],
    "no-console": "off",
    "no-empty-function": "error",
    "no-floating-decimal": "error",
    "no-inline-comments": "error",
    "no-lonely-if": "error",
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": [
      "error",
      { "max": 2, "maxEOF": 1, "maxBOF": 0 }
    ],
    "no-shadow": ["error", { "allow": ["err", "resolve", "reject"] }],
    "no-trailing-spaces": ["error"],
    "no-var": "error",
    "object-curly-spacing": ["error", "always"],
    "prefer-const": "error",
    "quotes": ["error", "single"],
    "semi": ["off", "always"],
    "space-before-blocks": "error",
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "space-in-parens": "error",
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "spaced-comment": "error",
    "yoda": "error"
  }
}
`
    )

    fs.writeFileSync(
      path.join(projectPath, 'bot.js'),
      `const Discord = require('discord.js')
const { prefix, token } = require('./config.json')
// Add Your Token!

const client = new Discord.Client()

client.once('ready', () => {
  console.log(\`Logged in as \${client.user.tag}!\`)
})

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  if (command === 'ping') {
    message.channel.send('Pong.')
  } else if (command === 'beep') {
    message.channel.send('Boop.')
  }
  // ...
})

client.login(token)
`
    )

    process.chdir(projectPath)

    console.log('Installing dependencies...')
    execSync('npm install')

    console.clear()
    console.log(
      '\x1b[32m' + '\nThe installation is done, this is ready to use!'
    )
    console.log('\x1b[33m' + 'Edit config.json to start!')
  } catch (error) {
    console.log(error)
  }
}

main()
