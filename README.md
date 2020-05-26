<p align="center" style="padding: 20px; background: #252832">
  <a href="https://ergonode.com" rel="noopener noreferrer">
    <img width="300" src="https://ergonode.com/img/logo.svg" alt="Egronode logo">
  </a>
</p>
<p align="center">Desktop PWA Ready Product Information Management Platform</p>

<p align="center">
  <a href="https://ergonode.com">
    <img src="https://img.shields.io/badge/version-0.8.0-4c9aff.svg" alt="Version">
  </a>
  <a href="https://ergonode.com">
    <img src="https://img.shields.io/badge/version%20code-Vegas-00bc87.svg" alt="Code Version">
  </a>
  <a href="https://join.slack.com/t/ergonode/shared_invite/enQtNjI5NzU3NzM2MzU2LTY0ZGM4MGMyNGZjOGEyNDY5OGI1NzM5ZDNiMTY3YjA2YmRhMzY1OWE1MjJjZWEzM2YwOThkZDBjODZlZjY0ZmI">
    <img src="https://img.shields.io/badge/chat-on%20slack-e51670.svg" alt="Chat">
  </a>
  <a href="https://docs.ergonode.com">
    <img src="https://img.shields.io/badge/docs-read-ffc108.svg" alt="Docs">
  </a>
  <a href="https://github.com/ergonode/frontend/blob/master/LICENSE.txt">
    <img src="https://img.shields.io/github/license/ergonode/frontend.svg" alt="License">
  </a>
</p>
<br>

## Installation

**1) Manual**

Clone project repository to your local directory:

```bash
git clone git@github.com:ergonode/frontend.git
```

Install project dependencies:

```bash
npm install
```

Follow cli steps to configure project:

```bash
npm run modules
```

You might want automatically setup all modules by executing command:
```bash
npm run modules:all
```

> *You may want to override created .env file by other settings*

Run development mode

```bash
npm run dev
```

Run production mode

```bash
npm run build
npm run start
```

> *After you set up [backend application][backend] and generated default fixtures you may login into application with credentials `test@ergonode.com`, password: `abcd1234`*

**2) Docker**

Installation guide at [docker repository][docker]

## Browser

We recommend using the latest version of **Chrome** browser.
On other browsers some functionalities may not work as intended.

## Documentation

The project is in early stage and we have got a lot of milestones to develop.  We do our best to deliver great documentation, but - to be honest -  it is the hardest thing in open-source projects :)

**Please find out what we've already prepared on [docs.ergonode.com][docs]**

## Technologies

- Vue.js
- Nuxt.js
- Node.js
- SASS
- Axios
- BEM (CSS)
- ESLint (Airbnb standard)
- Cypress
- JestJS

## Contact us

If you have any questions or ideas feel free to join our [slack][slack].

## Is it production ready

No! At the moment we have only one testing implementation to production environment (with more than 150k+ product indexes and integration with Magento Commerce 2.3), but in our opinion system still needs to be stabilised and we recommend not to use it at the moment in production mode. We still develop the core and there could be a lot of changes in the near future. If you want to know when it will be production ready look at Ergonode Roadmap.

## Contributing

Before you start making any pull requests checkout our [contribution guide][contribut]. If you have any questions or ideas feel free to join our [slack][slack] or send us an email: contributors@ergonode.com

## Partners

Ergonode is open-source, and it can be brought to you only by great community and partners supported by our core team. If you want to be on that list please send us an email: contributors@ergonode.com

## The license

Ergonode source code is released under the [OSL 3.0 License][license].

[discord]: https://discord.gg/NntXFa4
[slack]: https://ergonode.slack.com/join/shared_invite/enQtOTA2ODY0ODMxNTI0LThlZGE2YWE0YzY4NzU1ODk3NWRmNTJiMGI2NmM5ZTgxYTk0MWRhMjM1Y2M4MjdjZjAxY2FkOWE1M2FhZmJkMDY
[contribut]: http://docs.ergonode.com/#/contribution
[license]: ./LICENSE.txt
[roadmap]: https://ergonode.com/features/#roadmap
[docs]: https://docs.ergonode.com
[ddd]: https://en.wikipedia.org/wiki/Domain-driven_design
[cqrs]: https://en.wikipedia.org/wiki/Command%E2%80%93query_separation
[es]: https://dev.to/barryosull/event-sourcing-what-it-is-and-why-its-awesome
[backend]: https://github.com/ergonode/backend
[frontend]: https://github.com/ergonode/frontend
[docker]: https://github.com/ergonode/docker
