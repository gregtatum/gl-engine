import Identity from 'gl-quat/identity'
import RotateX from 'gl-quat/rotateX'
import RotateY from 'gl-quat/rotateY'
import RotateZ from 'gl-quat/rotateZ'

var rotate = {
	x : RotateX,
	y : RotateY,
	z : RotateZ,
}

export default function updateEuler( transform ) {
	
	if( transform.flags.useEuler ) {
		var quat = transform.quaternion
		
		var rotateA = rotate[ transform.eulerOrder[0] ]
		var rotateB = rotate[ transform.eulerOrder[1] ]
		var rotateC = rotate[ transform.eulerOrder[2] ]
		
		Identity( quat )
		rotateA( quat, quat, transform.euler[0] )
		rotateB( quat, quat, transform.euler[1] )
		rotateC( quat, quat, transform.euler[2] )
	}
}