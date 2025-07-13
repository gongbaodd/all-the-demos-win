package com.example.dice.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class DiceViewModel: ViewModel() {
    private val dice = Dice()
    private val _currentRoll = MutableStateFlow(1)
    val currentRoll: StateFlow<Int> = _currentRoll

    fun rollDice() {
        viewModelScope.launch {
            val result = dice.roll()
            _currentRoll.value = result
        }
    }
}