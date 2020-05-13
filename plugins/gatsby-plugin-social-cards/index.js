const path = require( 'path' )
const jimp = require('jimp')

module.exports = ({ markdownNode }) => {
  const { frontmatter, fields } = markdownNode
  const output = path.join( './public', fields.slug, 'social_img.jpg' )

  return Promise.all([
    jimp.read( path.join( __dirname, 'base.jpg' ) ),
    jimp.loadFont( path.join( __dirname, 'fonts/Montserrat-Black-80/Montserrat-Black-80.fnt' ) )
  ]).then(([image, font]) => {
    image
      .resize(1200, 630)
      .print(
        font,
        118,
        60,
        {
          text: frontmatter.title,
          alignmentX: jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
        },
        923,
        574
      )
      .write(output)
  })
}