export default {
  title: 'Icons',
  name: 'icons',
  type: 'string',
  options: {
    list: [
      {title: 'Bud', value: 'bud'},
      {title: 'Acorn', value: 'acorn'}
    ], // &lt;-- predefined values
  },
  preview: {
    select: {
      list: 'list',
    },
    prepare(selection) {
      const { list } = selection
  
      return {
        title: list,
        // media: (
        //   <span
        //     style={{
        //       border: 'solid',
        //       borderWidth: '0.5px',
        //       borderColor: 'white',
        //       width: '2rem',
        //       height: '2rem',
        //       borderRadius: '100%',
              
        //     }}
        //   />
        // ),
      }
    },
    },
}