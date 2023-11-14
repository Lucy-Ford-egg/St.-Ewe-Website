import {createClient} from "@sanity/client"

// import {imageUrlBuilder} from "@sanity"

const client = createClient({
projectId: 'mq5c1tyr', //process.env.SANITY_STUDIO_PROJECT_ID,
dataset: 'production',
apiVersion: '2023-06-22',
useCdn: false, // must be false when using 'previewDrafts'
perspective: 'previewDrafts', // 'raw' | 'previewDrafts' | 'published'
token: 'sk37PYyNwXGqnaf9Ycz5wJe9dfIJ1K4n5wdbPwI8m8OStEsR0jeK9j14t5G07vbKFyLwo1tONNiH94xREIR4pGHJThVoXW92u5v0JwtepbxRDkGtKd130JuC0z4QGg5AzwlkPSSPMbNpKmM0VPPWrB1XVNMHjQJVeTcVFTVSFUXLfEG90zR7'
})

function resolveImages(images) {
  images && images.map((image) => {
    return (image)
  })
  return null
}

function transform(externalUnit) {

  const unit =  {
      _type: 'unit',
	    _id: `${externalUnit.unitID}`,
      name: externalUnit.name,
      //unitImages: externalUnit.images,
      maxGrading: externalUnit.maxGrading,
	    maxOccupancy: externalUnit.maxOccupancy,
      numberOfRooms: externalUnit.numberOfRooms,
      summary: externalUnit.summary || null,
      categoryId: externalUnit.categoryID,
	  }
	  return [unit]
}

const baseUrl = `https://api.gemapark.co.uk`
const endPoint = `GetUnits`
const API_URL = `${baseUrl}/web.svc/v1_0/json/${endPoint}`
const USERNAME = `pentewansands`
const PASSWORD = `j2t]eZx-GjDEvsO-aSth`

const options = {
  username: USERNAME,
  password: PASSWORD,
  cultureCode: "en-GB",
  categoryIDs: [1],
  parkIds: [13258],
}


const getUnits = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(options), // body data type must match "Content-Type" header
      // cache: "no-cache" // ! just to get force fresh data.
      
    });
    // network error in the 4xx–5xx range
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    if(response.ok){
      const jsonResponse = await response.json()

     
      
      const resolve = jsonResponse.data.map(transform)
      resolve.map((documents) => {
  
        const units = documents.filter(doc =>
          doc._type === 'unit'
        )
        // Write all units to the dataset using a createOrReplace mutation
        const allUnitsWritten = Promise.all(units.map(unit =>
          client.createOrReplace(unit)
        ))
  
        return allUnitsWritten
      })
    }
  }
  catch (error) {
    console.log(error);
  }
}

getUnits()