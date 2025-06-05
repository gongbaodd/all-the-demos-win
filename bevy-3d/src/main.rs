use bevy::{prelude::*};

mod player;
use player::PlayerPlugin;
mod  camera;
use camera::CameraPlugin;
mod world;
use world::WorldPlugin;

fn main() {
    App::new()
        .add_plugins((DefaultPlugins, PlayerPlugin, CameraPlugin, WorldPlugin))
        .run();
}
