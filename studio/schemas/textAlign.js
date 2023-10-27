export default {
  title: 'Text Align',
  name: 'textAlign',
  type: 'string',
  options: {
    list: [
      {title: 'Left', value: 'left'},
      {title: 'Center', value: 'center'},
      {title: 'Right', value: 'right'}

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