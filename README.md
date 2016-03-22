# submit-data

This is a work-in-progress demo: [submitdata.surge.sh](http://submitdata.surge.sh)

## Submit data to a JSON file via a form using the GitHub API

It's useful to keep small datasets in GitHub repositories, particularly for projects that are more content-focused like maps and data visualizations that are hosted on gh-pages.

It would be very useful to provide a page where users can log in with the GitHub API, fill out a form, and have the fields appended to a JSON file that is an array of objects.

That's what this project will provide.

## What does it do?

- A user logs in via GitHub on the site.
- They fill out the form with the fields you have specified.
- This project does the following actions:
  - creates a fork on the user's account if it doesn't exist already
  - creates a branch for their changes
  - creates a commit adding an object to the JSON file you specified
  - creates a pull request back to the source repository

## Todo

The next stage for this project is to make it reusable, so that you can provide a similar form in your gh-pages hosted repositories.

Similar functionality will also be added to the [editdata.org](http://github.com/editdata/editdata.org) project.

## License
MIT