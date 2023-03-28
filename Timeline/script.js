


// Timeline Setups
var animation_water = new TimelineMax({
    repeat: -1, 
    yoyo: true
});

// Water Animation
animation_water
    .to("#water", 2, {y: 12, morphSVG:"#water-2", ease:Linear.easeNone}, 0 , 0);