package com.example.dice.presentation

class Dice {
    fun roll(): Int {
        return (1..6).random()
    }
}