import '../../node_modules/three/examples/js/utils/SceneUtils.js'
function fanShaped (opt){
    var opt = Object.assign({
        color:'#333',   // 颜色
        r:'40',         // 半径
        start:0.7,        // 起始角度
        end:Math.PI/2.1,  //终止角度
        height:10,       // 高度
        vertex:[0,0,0]   // 顶点坐标,目前只有前两个有用，默认饼图位于xy平面z轴拉伸
    },opt || {})
    function semiCircle(r, start, end) {
        var shape = new THREE.Shape();
        let center = [opt.vertex[0],opt.vertex[1]]
        shape.arc(...center, r, start, end);
        shape.lineTo(...center);
        shape.lineTo(center[0] + r * Math.cos(start),center[1] + r * Math.sin(start));
        return shape
    }
    var p = new THREE.MeshLambertMaterial({
        color: opt.color
    });
    var q = [p, p];
    var r = new THREE.ExtrudeGeometry(semiCircle(opt.r, opt.start, opt.end), {
        amount: opt.height,
        bevelThinkness: 2,
        bevelSize: 0,
        bevelSegments: 30,
        bevelEnabled: false,
        curveSegments: 30,
        steps: 1
    });
    let shape = new THREE.SceneUtils.createMultiMaterialObject(r, q);
    return shape
}
window.fanShaped = fanShaped
