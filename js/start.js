/**
 * @author      Shawn Hymel <@ShawnHymel>
 * @copyright   2016 Shawn Hymel
 * @license     {@link http://choosealicense.com/licenses/no-license/|No License}
 * @description This example demonstrates the VirtualGamepad plugin.
 */
 
var game = new Phaser.Game(500, 500, Phaser.CANVAS);

var PhaserGame = function() {
    this.player = null;
}

PhaserGame.prototype = {
    
    preload: function() {
        
        // Load the gamepad spritesheet. Note that the width must equal height
        // of the sprite.
        this.load.spritesheet('gamepad', 
            'assets/gamepad/gamepad_spritesheet.png', 100, 100);
        
        this.load.image('ship', 'assets/ship.png');
    },
    
    create: function() {
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
        
        this.player = this.add.sprite(250, 250, 'ship');
        //this.player.body.collideWorldBounds =  true;
        
        var style = {font: '16px Arial', 
                     fill: '#ffffff', 
                     align: 'left', 
                     fontWeight: 'bold', 
                     stroke: '#000000', 
                     strokeThickness: 6};
         
        this.directionText = this.add.text(20, 20, '', style);
        this.rectangularText = this.add.text(140, 20, '', style);
        this.polarText = this.add.text(260, 20, '', style);
        this.buttonText = this.add.text(380, 20, '', style);
        
        // Add the VirtualGamepad plugin to the game
        this.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);
        
        // Add a joystick to the game
        this.joystick = this.gamepad.addJoystick(100, 400, 1.0, 'gamepad');
        
        // Add a button to the game
        this.fireButton = this.gamepad.addButton(400, 400, 1.0, 'gamepad');
    },
    
    update: function() {
        this.updateDebugText();
    },
    
    render: function() {
        game.debug.pointer(game.input.pointer1);
        game.debug.pointer(game.input.pointer2);
    },
    
    updateDebugText: function() {
        this.directionText.setText("Direction:\n up: " + this.joystick.isUp + 
            "\n down: " + this.joystick.isDown + 
            "\n left: " + this.joystick.isLeft + 
            "\n right: " + this.joystick.isRight);
        this.rectangularText.setText("Rectangular:\n x: " + 
            this.joystick.positionX + "\n y: " + this.joystick.positionY);
        this.polarText.setText("Polar:\n radius: " + this.joystick.radius + 
            "\n angle: " + this.joystick.angle);
        this.buttonText.setText("Button: " + this.fireButton.isDown);
    }
};

game.state.add('Game', PhaserGame, true);