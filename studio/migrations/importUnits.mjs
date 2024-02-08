import {createClient} from "@sanity/client"
import {WPAPI} from 'wpapi'

// import {imageUrlBuilder} from "@sanity"

const client = createClient({
projectId: '0y4lutj5', //process.env.SANITY_STUDIO_PROJECT_ID,
dataset: 'production',
apiVersion: '2023-08-01',
useCdn: false, // must be false when using 'previewDrafts'
perspective: 'previewDrafts', // 'raw' | 'previewDrafts' | 'published'
token: ""
})

function resolveImages(images) {
  images && images.map((image) => {
    return (image)
  })
  return null
}

function transform(){

 const post =  {
  _type: 'post',
  _id: `${externalPost.id}`,
  title: externalPost.title.rendered,
  date: externalPost.date,
  body: content.rendered,
}
return [post]

}

const POST_URL = `https://taylormoney.com/wp-json/wp/v2/posts`

const getData = async () => {
  fetch(POST_URL)
  .then(res => res.json())
  .then(posts => posts.map(transform))
  .then(documents =>
  	// documents is now an array of [country, cat], so we need to flatten it. We'll use lodash.flatten for that
  	flatten(documents)
  )
  .then(documents =>
    // now we have all our documents and are ready to save them to our dataset
    client.createOrReplace(documents)
  )
}

getData()