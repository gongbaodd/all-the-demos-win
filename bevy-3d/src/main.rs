use bevy::{prelude::*, pbr::*};

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .run();
}

fn spwan_floor(
    mut commands: Commands,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials: ResMut<Assets<StandardMaterial>>
) {
    let floor = PbrBundle {
        mesh: meshes.add(Mesh::from(shape::from_size(15.0))),
        material: materials.add(Color::DARK_GREEN.into()),
        ..default()
    };

    commands.spawn(floor);
}