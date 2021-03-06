ig.module(
    'game.entities.skelfish'
)
    .requires(
    'impact.entity'
)
    .defines(function(){

        EntitySkelfish = ig.Entity.extend({
            size: {x: 16, y: 8},
            offset: {x: 0, y: 0},
            maxVel: {x: 100, y: 100},
            friction: {x: 150, y: 0},
            gravityFactor: 0,

            type: ig.Entity.TYPE.B, // Evil enemy group
            checkAgainst: ig.Entity.TYPE.A, // Check against friendly
            collides: ig.Entity.COLLIDES.PASSIVE,

            health: 100,


            speed: 40,
            flip:false,

            animSheet: new ig.AnimationSheet( 'media/skelfish.png', 16, 7 ),



            init: function( x, y, settings ) {
                this.parent( x, y, settings );

                this.addAnim( 'swim', 1, [0] );

            },


            update: function() {
                // Near an edge? return!
                /*if( !ig.game.collisionMap.getTile(
                        this.pos.x + (this.flip ? +4 : this.size.x -4),
                        this.pos.y + this.size.y+1
                )
                    ) {
                    this.flip = !this.flip;

                    // We have to move the offset.x around a bit when going
                    // in reverse direction, otherwise the blob's hitbox will
                    // be at the tail end.
                    this.offset.x = this.flip ? 0 : ;
                }*/

                var xdir = this.flip ? -1 : 1;
                this.vel.x = this.speed * xdir;
                this.currentAnim.flip.x = !this.flip;

                this.parent();
            },

            kill: function() {

                this.parent();

            },

            handleMovementTrace: function( res ) {
                this.parent( res );

                // Collision with a wall? return!
                if( res.collision.x ) {
                    this.flip = !this.flip;
                    this.offset.x = this.flip ? 0 : 0;
                }
            },

            check: function( other ) {
                other.receiveDamage( 100, this );
            }
        });

    });