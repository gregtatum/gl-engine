[back to index](./)
# [camera/perspective](https://github.com/glamjs/glam/tree/master/lib/camera/perspective)
Create a perspective camera that includes a field of view, aspect ratio, and a near and far clipping. This type of camera simulates the projection of a normal point and click camera. Objects will converge towards the horizon line the further away they are from the camera.

## Example
```js
import Camera from 'glam/lib/camera/perspective'

var camera = Camera( Math.PI*0.5, 1, [0.01, 100] )

camera.transform.position[2] = -10

scene.render(camera)
```

## API

### `Camera( fieldOfView, aspectRatio, clipping ) -> PerspectiveCamera`

This function creates the `PerspectiveCamera` object.

| arg         | type   | description |
| ----------- | ------ | ----------- |
| fieldOfView | number | The field of view in radians, zoom in with a lower number, zoom out with a higher. |
| aspectRatio | number | The aspect ratio relative to the canvas's aspect ratio. Equivalent to `aspectRatio * canvas.width / canvas.height`. |
| clipping    | array  | The near and far clipping of the camera in the form of `[1,100]`. Keep these numbers realistically close to what is in your scene or else you might get weird rendering artifacts due to float precision. |


### Returned `PerspectiveCamera` Object

| property         | type       | description |
| ---------------- | ---------- | ----------- |
| transform        | transform  | The set of transformation properties. Used to generate the view matrix. |
| aspectRatio      | number     | If changed, the projection matrix will be recalculated during the next rendering. |
| clipping         | array      | If changed, the projection matrix will be recalculated during the next rendering. |
| fieldOfView      | number     | If changed, the projection matrix will be recalculated during the next rendering. |
| projection       | mat4       | A `Float32Array` that contains a 4x4 matrix. Represents the projection, or skewing of the perspective. |
| view             | mat4       | A `Float32Array` that contains a 4x4 matrix. Represents the location of the camera in space. |
| update           | function   | see below |
| updateProjection | function   | see below |
| updateView       | function   | see below |

#### perspectiveCamera.update()

Updates the projection and view matrices. Projection is only updated if values changed. This must be called by the renderer.

#### perspectiveCamera.updateProjection( canvas )

Updates only the projection matrix based on the canvas size.

#### perspectiveCamera.updateView()

Updates only the view matrix.
