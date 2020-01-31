<p align="center">
  <a href="https://vuejs.org" rel="noopener noreferrer">
    <img width="300" src="https://ergonode.com/wp-content/themes/ergonode/assets/img/logo.svg" alt="Egronode logo">
  </a>
</p>
<p align="center">Desktop PWA Ready Product Information Management Platform</p>

<p align="center">
  <a href="https://ergonode.com">
    <img src="https://img.shields.io/badge/version-0.6.1-4c9aff.svg" alt="Version">
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

## Instalation

**1) Manual**

Download project repository (ergonode) to your local directory:
```bash
git clone git@github.com:ergonode/frontend.git
```
Open your terminal in local project, and execute:
```bash
npm install
```
Execute CLI command and set you API URL:
```bash
npm run cli:run
```
> *You can also copy .env.dist file as .env and set your API URL configuration.*

Run server
```bash
#development
npm run dev

#production
npm run build
npm run start
```

**2) Using Docker**

Documentation how to install: [docker repository][docker]

## Browser

We recommend using the latest version of **Chrome** browser.
On other browsers some functionalities may not work as intended.

## Documentation

The project is in early stage and we have got a lot of milestones to develop.  We do our best to deliver great documentation, but - to be honest -  it is the hardest thing in open-source projects :)

**Please find out what we've already prepared on [docs.ergonode.com][docs]**


#### Front-End Technologies

- Vue.js
- Nuxt.js
- Node.js
- SASS
- Axios
- BEM (CSS)
- ESLint (Airbnb standard)


#### Tests

- Cypress
- JestJS

## Build with us community on Slack

If you have any questions or ideas feel free to join our [slack][slack].

## Is it production ready?

No! At the moment we have only one testing implementation to production environment (with more than 150k+ product indexes and integration with Magento Commerce 2.3), but in our opinion system still needs to be stabilised and we recommend not to use it at the moment in production mode. We still develop the core and there could be a lot of changes in the near future. If you want to know when it will be production ready look at Ergonode Roadmap.


## Roadmap

If you would like to find the current and future milestones for our project go to our [Roadmap][roadmap] page.

At the moment we finalize development of Milestone 1 of the project.

## Build Ergonode with us!

We are looking for Contributors: Back-end Dev, JS Devs, Tech Writers and Designers. Please read our [contribution rules][contribut] before making any pull request. If you have any questions or ideas feel free to join our [slack][slack] or send us an email: contributors@ergonode.com

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
[frontend]: https://github.com/ergonode/frontend
[docker]: https://github.com/ergonode/docker
