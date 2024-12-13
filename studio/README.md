# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)


# Wordpress Migrations 

npx sanity@latest migration run import-wp --dataset {dataset} --project {projectId} --no-dry-

 - [See tutorial](https://www.sanity.io/learn/course/migrating-content-from-wordpress-to-sanity)

 Example CLI Command: npx sanity@latest migration run import-wp --no-dry-run --type=recipe --dataset production --project vmhe5utz

 # Bulk deleting docs

 sanity documents delete --dataset={dataset} "id" "id" ...

 ## Bulk deleting by document type + dataset

 sanity documents query "*[_type == 'redirects']._id" --dataset beta --apiVersion 2022-03-07 \
  | jq -r '.[] | gsub(","; "")' \
  | xargs -I {} sanity documents delete {} --dataset beta --apiVersion 2022-03-07