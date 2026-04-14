## The Mini-SaaS Project

This repo is part of the Mini-SaaS project.

Sometimes when building a large complex system,
it helps to first start by isolating the major problems.
To do this,
I built the major portions of a small Software as a Service (SaaS) app
independetly from eachother.
This was used to learn how these portions should work individually,
rather than trying to learn it all at once.

The different projects invovled are:

* [Mini-SaaS-Auth](https://github.com/theTaikun/Mini-SaaS-Auth):
    Integrating Supabase for authentication only.
    Frontend and backend are portable,
    and database could be hosted on Supabase or elsewhere.
* [Mini-SaaS-Pay](https://github.com/theTaikun/Mini-SaaS-Pay):
Integrating Stripe for recurring payments.


## Overview

Interaction between frontend and backend is the focus of **Mini-SaaS-Auth**.
Therefore, it has been kept as a single repo.
See the `README.md` file within each folder
in order to learn more about that specific module.

Start by running the backend API so that you have the bind address,
then configure your frontend to use that address.
