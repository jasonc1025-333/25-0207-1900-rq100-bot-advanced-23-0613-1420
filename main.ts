// Very-Key Notes:
// 
// ----- ----- ----- ----- ----- ----- ----- -----
// 
// * Key Notes: Bot (Network: Server)
// 
// * DfRobot Driver Expansion Board
// 
// ** https://wiki.dfrobot.com/Micro_bit_Driver_Expansion_Board_SKU_DFR0548
// 
// ** https://github.com/DFRobot/pxt-motor
// 
// * Micro-Servo 9G A0090 (Sparkfun)
// 
// ** ~ HiTec HS-55
// 
// ** MicroBit: 'servo set pulse pin Px (e.g. P8) to (us) ___'  :)+
// 
// * To prevent flooding this bot-server with messages, have controller-client delay approx. 20ms to still maintain real-time response after each send-tx.
// 
// * Also, 1 Char Msg Max, 2 Char or more caused buffer-overrun and serial broke down, froze
// 
// * on event AB not work, but A or B does work reliably
// 
// * also 'on button A', 'on button B', and 'on button A+B' do work without 'on event' blocks present: event triggers only on ButtonEvtUp reliably
// 
// ** Also if held down longer than 2 sec, event will be aborted
// 
// * Thus, avoid condition: 'button A/B/A+B is pressed' block since not reliable
// 
// ----- ----- ----- ----- ----- ----- ----- -----
// 
// * Key Notes: Controller-Joystick (Network-Client)
// 
// * Yahboom Joystick
// 
// ** https://www.yahboom.net/study/SGH
// 
// ** https://github.com/lzty634158/GHBit
// 
// * DfRobot Driver Expansion Board
// 
// ** https://wiki.dfrobot.com/Micro_bit_Driver_Expansion_Board_SKU_DFR0548
// 
// ** https://github.com/DFRobot/pxt-motor
// 
// ----- ----- ----- ----- ----- ----- ----- -----
// 
// ----- ----- ----- ----- ----- ----- ----- -----
// 
// * 2nd level of conditions not reliable involving 'name', 'value' and 'button press'
// 
// * Prevent Boundary Issues with Rollover/FlipMSB, Thus Force Largest-Boundaried-Tilt, etc.: Constrain Raw Tilts: -90,+90 or -60,+60
// 
// * Disable code (pulling out of stack) is same as removing code and is effective for redeeming used disk/ram space
// 
// * Deadzone was 20, yet do 30 for safety buffer
// 
// * button_Debounce_TriggerDisableMsec: 'Pause appears to solve timing issue of multiple tx where gears are skipped, thus slow down tx: 100ms too fast - not help, 200ms best, 500ms better, 1s, 2s good
// 
// * Do not allow 'on shake/freefall/any_motion_event' for Bot since collision can accidentally trigger this
// 
// * MicroBit A/B Buttons not work well with LED Display, so use 'show string' instead
// 
// * Test Responsiveness-RealTime via Rocking-Joystick-BackAndForth-BothExtremes
// 
// ** 20msec :) not bad-but some lag, 50msec :) seems just right, 100msec not bad-but some lag
// 
// ** network_Throttle_PausePerCpuCycle_Int = 50
// 
// ** Both Bot and Controller appears automatically balanced at 40msec/cpu_cycle
// 
// 2021-0307
// 
// * Round does work, yet for Quadrant 2, 4, opposite polarity causes X.Y Pair not work, since will not sum correctly, thus must offset with 255 for all positive message-transfer
// 
// * false = 0, true > 0 (non-zero)
// 
// 2021-0308-0900
// 
// * Seems Javascript more robust debugger:error-finder vs. Python
// 
// * Makecode: only changes honored on the latest web-version in case duplicate window
// 
// 2021-0311
// 
// * Weird compass rotation is skewed moving forward and backward in a cyclical way, does distort the number. Stationary okay, but added motion not good.  Wheels don't need to move.
// 
// 2021-0313
// 
// * P16 and P8 are the only pins not reserved for anything else, thus free for Servo 1 &  2
// 
// ** yet P8 hard to find, so use p15 instead
// 
// ** https://makecode.microbit.org/device/pins
// 
// * Seems that servos are reversed orientation.  Look from outside observer, not driver-perspective
// 
// * Seems that  Lego Servos are 270-degrees range (vs180)
// 
// 22-1126
// 
// * Seems best that switch to true 'Bool' type vs 'Bool_Int' though more convenient for 'serial_prints', not good for customized api_blocks
// 
// 22-1217
// 
// * Delauren Total-Quad-Arm Lift: 3 x AA = 3 x 24g/AA = 75 g
// 
// ** 100 g too much
// 
// ** LEGO Technic Weight Block 50g
// 
// 22-1218
// 
// * TYJ used Medium 2KG-Torque Twin Motors can lift 200g w/o much strain, 250g with straining. Direct axle shaft best for max torque.  Avoid Dog-Gear for Max Torque.  These motors stop being strong enough to cut/break/severe/pinch off your finger.  ; )
function screen_Show_Command_Func(screen_X_In: number, screen_Y_In: number) {
    led.plotBrightness(screen_X_In, screen_Y_In, screenBrightness_Hi_DEFAULT_INT)
    // too long: 50ms, 100ms, 500ms
    basic.pause(20)
    led.unplot(screen_X_In, screen_Y_In)
    screen_Show_DiagnosticDashboard_Func()
}
function screen_Show_DiagnosticDashboard_Func() {
    screen_Clear_Fn(4, 4)
    doGroupChannelShow_Func()
}
// Key Notes
// 
// * 2020-0120: 844 SW error : GC allocation failed for requested number bytes: GC (garbage collection) error of 57 variables max,
// 
// * 2020-0120-02: Arm Servo
// 
// ** S-bus not work (DFRobot driver), so switch to P-bus (MakeCode driver)
// 
// ** DfRobot only has P0, P1, P2 as Read/Write from MakeCode's Menu, so reserve for Read Only.  Rest for Write Only.
// 
// *** Ultrasonic Sensor: P0 (Read, Echo), P8 (Write, Trigger)
// 
// *** ServoArmRight: P12 (Write-Only)
// 
// *** PIxyCam: P13 (Write-Only) Pan Servo, P14 (Write-Only) Tilt Servo, P1 (Read) Dig In from PixyCam-P1, P2 (Read) Ana In from PIxyCam-P8, S8-Pwr, S8-Gnd
// 
// * 2020-0305
// 
// ** 844 Error 57,49 variable max issue: Consolidate 'index_X' 'index_Y' to 'index'
// 
// * 2020-0328
// 
// ** DFRobot S1 not seem to work for Arm-Right, though worked before, go back to micro:bit P16
// 
// ** abandon usage of S1-S6 for now, not reliable, since not work before, yet TYJ P1-P16 does  :)+
// 
// * 2020-04xx
// 
// * Micro-Servo 9G A0090 (Sparkfun)
// 
// * HiTec HS-55
// 
// * MicroBit: 'servo set pulse pin Px (e.g. P8) to (us) ___'  :)+
// 
// * Using DFRobot Servo Pins not reliable, possibly since these are 3.3.v servos (not standard 5.0v servos), thus use MicroBit 'servo write pin Pxx' blocks for reliable 0-180 degrees.
// 
// 2021-0228
// 
// * DC Motors
// 
// ** \ e.g. 155, 205, 255 (which is close enough to 255 during testing); delta 50
// 
// ** 70% of 255 = 178.5 = 180 rounded-up; also (155+205)/2 = 180
// 
// ** Stick w/ 155 (vs 180) for most significant difference vs Gear 2
// 
// * KEY BUG: 'round' not seems to work, thus do manually
// 
// * Button 'Release' Not Reliable, Seems Buggy
// 
// * Use Digital-Pin as a DIP Switch for Setup
// 
// ** Use P16 since easiest to locate (at top) for quick change
// 
// ** For Controller-Joystick: Yahboom: Appears P16 defaults to Low when Open-Circuit
// 
// ** Remove P16-Dependency since unreliable open-circuit value: either 0 or 1
// 
// * Tried 10, but maybe not enough granularity, assuming have new, same-aged dc-motors.
// 
// ** Resume back to 5 (smallest significant)
// 
// ** Even need more, then recommend replacing hardware: new pair of dc-motors.
// 
// 2021-0301
// 
// * For Critical Configs, Best to send absolute value ('on radio received name value') vs relative values (on radio received 'receivedString'), for robustness vs. dropped packets
// 
// ** This software config should be for small fine-tuning
// 
// * Tilt (/Rotation/Accelerometer) = 't_*' (Prefix-Header For Radio Messages)
// 
// ** WARNING: Seems like First condition ok when along, but when 2nd added, 1st is ignored. Thus 2-Level Logic Not Reliable
// 
// ** Original Motor0to255:(255,-255) -> (510,0) Add 255 here: Keep all positive since cannot radio two negative #, subtract 255 at destination
// 
// * Deactivate 'calibrate compass' since will force calibrate each new run of this code, which would be too much and inconvenient.  By default, calibrate occurs upon each flash, which is sufficient.
// 
// * Test Responsiveness-RealTime via Rocking-Joystick-BackAndForth-BothExtremes
// 
// * Both Bot and Controller appears automatically balanced at 40msec/cpu_cycle
// 
// ** As long avoid 400 msec consuming LED-displays
// 
// ** Thus keep at 0 msec
// 
// * Sonar
// 
// ** Standard/Default can be overridden by Master-Server
// 
// ** 15, 30, 45
// 
// 2021-0309
// 
// * 'serial write value 'name'='value'' uses ':' vs '='
// 
// 2021-0311
// 
// * Calibration: Swirl Around Like Panning for Gold, Moving Marble Around on Flat-Plane
function setup_Network_Fn() {
    if (true) {
        // Only 20 Leds Available
        network_GroupChannel_MyBotAndController_BASE0_MAX_INT = 25
        // Only 20 Leds Available
        network_GroupChannel_MyBotAndController_BASE0_MIN_INT = 1
        radio.setGroup(network_GroupChannel_MyBotAndController_Base0_Int)
        if (true) {
            network_GroupChannel_MyBotAndController_Digit_Hundreds_Int = Math.idiv(network_GroupChannel_MyBotAndController_Base0_Int, 100) % 10
            network_GroupChannel_MyBotAndController_Digit_Tens_Int = Math.idiv(network_GroupChannel_MyBotAndController_Base0_Int, 10) % 10
            network_GroupChannel_MyBotAndController_Digit_Ones_Int = Math.idiv(network_GroupChannel_MyBotAndController_Base0_Int, 1) % 10
        }
        if (true) {
            // * 3 sec  TOO SLOW? >> try 2 >> try 1 WILL CAUSE TOO MUCH NETWORK OVERHEAD
            network_HiMessage_Frequency_SEC_INT = 1
            quest_Note_3.quest_Show_String_For_Note_Small_Func(
                "IMPORTANT: Network Message will be cut off beyond Max Length"
            )
            network_Message_LENGTH_MAX_INT = 18
        }
        if (true) {
            // Constant Channel # for Master Server, which Receives Everyone's Score. Use 255 vs 0, since 0 could be easily not not used by normal users
            network_GroupChannel_ScoreboardServer_BASE0_INT = 255
        }
    }
}
// * General Notes
// 
// * 2019-0519-0340
// 
// ** DFRobot Driver Expansion Board
// 
// * 2019-0525-09-HAA TYJ first complete joystick XY
// 
// * Technical Notes
// 
// * 2019-1019
// 
// ** Create more responsiveness, no DeadZone
// 
// * 2020-0120: 844 SW error : GC allocation failed for requested number bytes: GC (garbage collection) error of 57 variables max,
// 
// ** Delete 'index_y2' (tried to reuse but '844' error)
// 
// ** Tried to reuse 'item' but probably is a system var
// 
// ** Remove unused 'button_AandB_Countdown_CpuCycles', 'buttonA_Then_B_On'
// 
// ** Rename used-only-once-via-set:
// 
// *** 'dashboardDisplay_Brightness_HI' to 'servo_Pan_Degrees' :)+
// 
// *** 'groupChannel_Digit_MIN' to 'servo_Pan_Degrees'
// 
// *** 'groupChannel_Digit_MAX' to 'servo_Tilt_Degrees'
// 
// 
// 
// * 2020-0120-02: Arm Servo
// 
// ** S-bus not work (DFRobot driver), so switch to P-bus (MakeCode driver)
// 
// ** DfRobot only has P0, P1, P2 as Read/Write from MakeCode's Menu, so reserve for Read Only.  Rest for Write Only.
// 
// *** Ultrasonic Sensor: P0 (Read, Echo), P8 (Write, Trigger)
// 
// *** ServoArmRight: P12 (Write-Only)
// 
// *** PIxyCam: P13 (Write-Only) Pan Servo, P14 (Write-Only) Tilt Servo, P1 (Read) Dig In from PixyCam-P1, P2 (Read) Ana In from PIxyCam-P8, S8-Pwr, S8-Gnd
// 
// * 2020-0224-1215
// 
// ** Network Test w/ Gaming Server
// 
// *** w/ Sonar: Simulated or Real
// 
// *** w/ BotId: Random or Real
// 
// * 2020-0305
// 
// ** 844 Error 57,49 variable max issue: Consolidate 'index_X' 'index_Y' to 'index'
// 
// *** Delete obsolete 'joystick_Value'
// 
// * 2020-0328
// 
// ** DFRobot S1 not seem to work for Arm-Right, though worked before, go back to micro:bit P16
// 
// ** abandon usage of S1-S6 for now, not reliable, since not work before, yet TYJ P1-P16 does  :)+
// 
// * 2020-04xx
// 
// Micro-Servo 9G A0090 (Sparkfun)
// 
// ~ HiTec HS-55
// 
// MicroBit: 'servo set pulse pin Px (e.g. P8) to (us) ___'  :)+
// 
// 0 no
// 
// 250 0
// 
// 500 no
// 
// >> 750: 45
// 
// 1000 90 - 10 = 80
// 
// 1250 90 + 10 = 100
// 
// >> 1500 90 + 30
// 
// 1750 180 - 30
// 
// 2000 170
// 
// 2250 190
// 
// >> 2500 225 = 180 + 30/45
// 
// 2750 no
// 
// 3000 no
// 
// * Using DFRobot Servo Pins not reliable, possibly since these are 3.3.v servos (not standard 5.0v servos), thus use MicroBit 'servo write pin Pxx' blocks for reliable 0-180 degrees.
function setup_BotAndController_Fn() {
    if (true) {
        _codeComment_AsText = "System Constants"
        if (true) {
            _system_BotAndController_Mode_As_SETUP_INT = 1
            _system_BotAndController_Mode_As_COMMAND_AS_MAIN_MODE_INT = 2
        }
        if (true) {
            _system_InvalidNumber_NEG_999_INT = -999
        }
    }
    if (true) {
        _codeComment_AsText = "System Vars"
        _system_BotAndController_Mode_Int = _system_BotAndController_Mode_As_SETUP_INT
        _system_ScreenFreeze_ForOverrideMessage_Bool = false
    }
    if (true) {
        _codeComment_AsText = "Bot & Controller Setup"
        // Default: None, since require manual activation since all-in-one code shared between both devices
        if (true) {
            deviceType_Bot_Bool = true
            deviceType_Controller_Bool = false
        }
        if (true) {
            screenBrightness_Hi_DEFAULT_INT = 255
            // lowest 1 is still visible :)+
            screenBrightness_MI_INT = 7
            // 127 not low enough, 15 is better, 1 too low, 7 seems good, try 8
            screenBrightness_LO_INT = 1
            screenBrightness_Heartbeat_Count_Int = 0
            // * [30..-5]by0.5 >> 1 sec one-way-trip, [50..-10]by1, [50-..-25]by1, [100..-50]by2, [200..-100]by4, off too long: [250..-50]by4
            if (true) {
                // 255 max too high, stays bright too long; 50 not bad, try 30 for more 1sec heartbeat
                screenBrightness_Heartbeat_Count_MAX_INT = 250
                // 0 not low enough, try -15 for more of 50% duty on/off cycle, try -10 for less off, try -5
                screenBrightness_HeartBeat_Count_MIN_INT = -50
                // * 1 >> 0.5
                screenBrightness_Heartbeat_Count_DELTA_INT = 4
            }
        }
        if (true) {
            tilt_Screen_Roll_X_Recenter_Raw_0to4_Int = 2
            tilt_Screen_Pitch_Y_Recenter_Raw_0to4_Int = 2
            // * Init to invalid Number Value to Force Proper Setup before Invalid Usage
            tilt_Screen_X_0to4_Old_Int = _system_InvalidNumber_NEG_999_INT
            // * Init to invalid Number Value to Force Proper Setup before Invalid Usage
            tilt_Screen_Y_0to4_Old_Int = _system_InvalidNumber_NEG_999_INT
            joystick_Tilt_Gear_Lo_ForMore_TurnControl_Dec = 0.3
            quest_Note_2.quest_Show_String_For_Note_Small_Func(
                "Was 0.6, now increase to 0.9"
            )
            joystick_Tilt_Gear_Hi_ForMore_StraightSpeed_Dec = 0.9
            joystick_Tilt_Gear_Now_Dec = joystick_Tilt_Gear_Lo_ForMore_TurnControl_Dec
        }
        if (true) {
            _debug_Show_Priority_Hi_Bool = true
            // * 500ms seems good, 1000ms no improvement, so stay w/ 500ms
            // * Seems that 3000ms seems best for min. lag issues, but not pragmatic,
            // * so stick with 500ms as recent test shows it as sufficient, vs 400, 300, 200, 100ms.
            _debug_Show_CpuCycleDelay_MILLISEC_INT = 500
        }
    }
    if (true) {
        quest_Dashboard.quest_Show_Oled_Cleared_Func(
        )
        quest_Dashboard.quest_Show_String_For_Oled_BigFont_Func(
            "Hi :)",
            0,
            0
        )
    }
    if (true) {
        quest_Note_2.quest_Show_String_For_Note_Small_Func(
            "Default: Down Pos."
        )
        wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S6, 0)
        wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S7, 45)
    }
}
function doGroupChannelShow_Func() {
    if (true) {
        doGroupChannel_Show_PerDigit_Func(network_GroupChannel_MyBotAndController_Digit_Hundreds_Int, 0, 0)
        doGroupChannel_Show_PerDigit_Func(network_GroupChannel_MyBotAndController_Digit_Tens_Int, 1, 0)
        doGroupChannel_Show_PerDigit_Func(network_GroupChannel_MyBotAndController_Digit_Ones_Int, 3, 0)
    }
}
// For these above radio-packets: Do this sub-stack for max cpu-cycles for driving motors for fastest real-time response
function driveMotor_Fn() {
    // Main 1of5: Initialize w/ Pitch on Both Motors L & R - along w/ 'motor_Power_Slower*' adjustments
    if (true) {
        joystick_Tilt_X_Neg100toPos100_Int = (joystick_Raw_X_0to200_Int - 100) * joystick_Tilt_Gear_Now_Dec
        joystick_Tilt_Y_Neg100toPos100_Int = (joystick_Raw_Y_0to200_Int - 100) * joystick_Tilt_Gear_Now_Dec
    }
    // Main 2of5: Complement w/ Roll on Both Motors L & R
    if (true) {
        motor_Power_L_Neg100toPos100_Int = joystick_Tilt_Y_Neg100toPos100_Int
        motor_Power_R_Neg100toPos100_Int = joystick_Tilt_Y_Neg100toPos100_Int
    }
    // Main 3of5: Activate Motors
    if (true) {
        motor_Power_L_Neg100toPos100_Int = Math.constrain(motor_Power_L_Neg100toPos100_Int + 1 * joystick_Tilt_X_Neg100toPos100_Int, -100, 100)
        motor_Power_R_Neg100toPos100_Int = Math.constrain(motor_Power_R_Neg100toPos100_Int + -1 * joystick_Tilt_X_Neg100toPos100_Int, -100, 100)
        // /jwc o roboQuest.quest_PowerMotorsViaBlueRedBlackPins_Fn(quest_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight, motor_Power_L_Neg100toPos100_Int, motor_Power_R_Neg100toPos100_Int)
        quest_Motors.quest_Set_PowerMotorsViaBlueRedBlackPins_Func(
            quest_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
            motor_Power_L_Neg100toPos100_Int,
            motor_Power_R_Neg100toPos100_Int
        )
    }
    // Main 4of5: Screen LED
    if (_system_ScreenFreeze_ForOverrideMessage_Bool == false) {
        // * Condition required to prevent wiping-out (0,0) by default
        if (tilt_Screen_X_0to4_Old_Int != _system_InvalidNumber_NEG_999_INT && tilt_Screen_Y_0to4_Old_Int != _system_InvalidNumber_NEG_999_INT) {
            // * Restore original 'brightness' to preserve original value (e.g. 'Group_Channel_#')
            led.plotBrightness(tilt_Screen_X_0to4_Old_Int, tilt_Screen_Y_0to4_Old_Int, tilt_Screen_XY_0to4_Brightness_Old_Int)
        }
        if (true) {
            // * Reverse orientation since 'micro:bit' upside-down
            tilt_Screen_X_0to4_Int = Math.round(Math.map(joystick_Raw_X_0to200_Int, 0, 200, 4, 0))
            // * Reverse orientation since 'micro:bit' upside-down
            tilt_Screen_Y_0to4_Int = Math.round(Math.map(joystick_Raw_Y_0to200_Int, 0, 200, 0, 4))
        }
        if (true) {
            tilt_Screen_XY_0to4_Brightness_Old_Int = led.pointBrightness(tilt_Screen_X_0to4_Int, tilt_Screen_Y_0to4_Int)
        }
        if (true) {
            led.plotBrightness(tilt_Screen_X_0to4_Int, tilt_Screen_Y_0to4_Int, Math.max(screenBrightness_Heartbeat_Count_Int, tilt_Screen_XY_0to4_Brightness_Old_Int))
            tilt_Screen_X_0to4_Old_Int = tilt_Screen_X_0to4_Int
            tilt_Screen_Y_0to4_Old_Int = tilt_Screen_Y_0to4_Int
        }
    }
}
input.onButtonPressed(Button.AB, function () {
    control.reset()
})
// To Insure Both at Synchronized States, Both Bot and Controller Must Start/Re-Start at 'setup_and_startup' State (e.g. for Manual Config Overrides, Debug-Serial-Prints, etc. to work)
// * Important News
// ** 'receivedstring': 18 char max
// ** 'name': 8 char max for this project
radio.onReceivedString(function (receivedString) {
    if (_system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_COMMAND_AS_MAIN_MODE_INT) {
        if (receivedString == "HiFrom_C") {
            if (led.point(4, 0)) {
                led.unplot(4, 0)
            } else {
                // * Higher brightness vs. 'Group_Channel_#', Highest Value since Network_Status is Very Important
                led.plotBrightness(4, 0, screenBrightness_Hi_DEFAULT_INT)
            }
        }
    }
})
// * Motion Control: Part 2of2: Bot
// 
// Seems 'name' is 8 char max, though 'on radio received ''receiveString''' does not seem to have such limitation
// 
// * Important News
// ** 'receivedstring': 18 char max
// ** 'name': 8 char max for this project
// 
// so any Messages Sent to Controller-Joystick will be dropped/ignored
radio.onReceivedValue(function (name, value) {
    // Criteria 1of1: Hardware=Based
    if (deviceType_Bot_Bool && !(deviceType_Controller_Bool) && _system_BotAndController_Mode_Int != _system_BotAndController_Mode_As_SETUP_INT) {
        if (name == "tilt_xy") {
            joystick_Raw_X_0to200_Int = Math.trunc(value)
            joystick_Raw_Y_0to200_Int = Math.round((value - Math.trunc(value)) * 1000)
            driveMotor_Fn()
        } else if (name == "gear_lo") {
            joystick_Tilt_Gear_Now_Dec = joystick_Tilt_Gear_Lo_ForMore_TurnControl_Dec
            screen_Show_Command_Func(3, 2)
        } else if (name == "gear_hi") {
            joystick_Tilt_Gear_Now_Dec = joystick_Tilt_Gear_Hi_ForMore_StraightSpeed_Dec
            screen_Show_Command_Func(1, 2)
        } else if (name == "serv_dwn") {
            wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S6, 0)
            wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S7, 45)
        } else if (name == "serv_up") {
            quest_Note_2.quest_Show_String_For_Note_Small_Func(
                "Delta: 45deg between Up & Down"
            )
            wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S6, 45)
            wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S7, 0)
        } else {
            basic.showString("!!! ERROR: 23-0519-1320: " + name)
        }
    }
})
function screen_ScrollText_Fn(text_Str_In: string) {
    // Fragment the substrings to be interruptible between each 'show string' block
    _tmp_Str = text_Str_In.split(",")
    for (let value of _tmp_Str) {
        basic.showString("" + (value))
        if (_system_BotAndController_Mode_Int != _system_BotAndController_Mode_As_SETUP_INT) {
            break;
        }
    }
}
function screen_Clear_Fn(row_X_Max_In: number, col_Y_Max_In: number) {
    for (let index_X = 0; index_X <= row_X_Max_In; index_X++) {
        for (let index_Y = 0; index_Y <= col_Y_Max_In; index_Y++) {
            led.unplot(index_X, index_Y)
        }
    }
}
function doGroupChannel_Show_PerDigit_Func(singleDigit_In: number, OffsetX_In: number, OffsetY_In: number) {
    for (let index2 = 0; index2 <= singleDigit_In - 1; index2++) {
        led.plotBrightness(4 - (Math.idiv(index2, 5) + OffsetX_In), 4 - (index2 % 5 + OffsetY_In), screenBrightness_MI_INT)
    }
}
let _system_BotAndControllelr_Mode_As_SETUP_TO_MAIN_INT = 0
let network_Message_Str = ""
let sensor_Magnetometer_Force_Raw_Int = 0
let sensor_LightLevel_Raw_Int = 0
let _tmp_Str: string[] = []
let tilt_Screen_Y_0to4_Int = 0
let tilt_Screen_X_0to4_Int = 0
let tilt_Screen_XY_0to4_Brightness_Old_Int = 0
let motor_Power_R_Neg100toPos100_Int = 0
let motor_Power_L_Neg100toPos100_Int = 0
let joystick_Raw_Y_0to200_Int = 0
let joystick_Tilt_Y_Neg100toPos100_Int = 0
let joystick_Raw_X_0to200_Int = 0
let joystick_Tilt_X_Neg100toPos100_Int = 0
let _debug_Show_CpuCycleDelay_MILLISEC_INT = 0
let _debug_Show_Priority_Hi_Bool = false
let joystick_Tilt_Gear_Now_Dec = 0
let joystick_Tilt_Gear_Hi_ForMore_StraightSpeed_Dec = 0
let joystick_Tilt_Gear_Lo_ForMore_TurnControl_Dec = 0
let tilt_Screen_Y_0to4_Old_Int = 0
let tilt_Screen_X_0to4_Old_Int = 0
let tilt_Screen_Pitch_Y_Recenter_Raw_0to4_Int = 0
let tilt_Screen_Roll_X_Recenter_Raw_0to4_Int = 0
let screenBrightness_Heartbeat_Count_DELTA_INT = 0
let screenBrightness_HeartBeat_Count_MIN_INT = 0
let screenBrightness_Heartbeat_Count_MAX_INT = 0
let screenBrightness_Heartbeat_Count_Int = 0
let screenBrightness_LO_INT = 0
let screenBrightness_MI_INT = 0
let deviceType_Controller_Bool = false
let deviceType_Bot_Bool = false
let _system_ScreenFreeze_ForOverrideMessage_Bool = false
let _system_BotAndController_Mode_Int = 0
let _system_InvalidNumber_NEG_999_INT = 0
let _system_BotAndController_Mode_As_COMMAND_AS_MAIN_MODE_INT = 0
let _system_BotAndController_Mode_As_SETUP_INT = 0
let network_GroupChannel_ScoreboardServer_BASE0_INT = 0
let network_Message_LENGTH_MAX_INT = 0
let network_HiMessage_Frequency_SEC_INT = 0
let network_GroupChannel_MyBotAndController_Digit_Ones_Int = 0
let network_GroupChannel_MyBotAndController_Digit_Tens_Int = 0
let network_GroupChannel_MyBotAndController_Digit_Hundreds_Int = 0
let network_GroupChannel_MyBotAndController_BASE0_MIN_INT = 0
let network_GroupChannel_MyBotAndController_BASE0_MAX_INT = 0
let screenBrightness_Hi_DEFAULT_INT = 0
let network_GroupChannel_MyBotAndController_Base0_Int = 0
let _codeComment_AsText = ""
// * Ok icon to look upside_down when micro:bit upside_down
if (true) {
    _codeComment_AsText = "'B' = 'B'ot"
    basic.showLeds(`
        # # # # .
        # . . . #
        # # # # #
        # . . . #
        # # # # .
        `)
    // * 3, 2, 1.5sec, 2 (to not confuse with default group_channel = 1
    // /jwc o roboQuest.quest_ContinueCurrentState_CountdownTimer_Set_Fn(2, quest_Time_Units_Enum.Seconds)
    quest_Timer.quest_Set_ContinueCurrentState_CountdownTimer_Func(2, quest_Time_Units_Enum.Seconds)
}
if (true) {
    _codeComment_AsText = "Set Group_Channel_# for Both Bot & Controller_Joystick"
    // * Good Stress Test: 199 (to test all dots for 10's, 1's; 255 (to test all dots for 100's: 1,2)
    network_GroupChannel_MyBotAndController_Base0_Int = 1
}
if (true) {
    setup_BotAndController_Fn()
    setup_Network_Fn()
}
loops.everyInterval(2000, function () {
    if (true) {
        quest_Note_2.quest_Show_String_For_Note_Small_Func(
            "Range: 0 - 255"
        )
        sensor_LightLevel_Raw_Int = input.lightLevel()
        if (sensor_LightLevel_Raw_Int <= 85) {
            led.plotBrightness(0, 0, 0)
        } else if (sensor_LightLevel_Raw_Int <= 170) {
            led.plotBrightness(0, 0, screenBrightness_MI_INT)
        } else if (sensor_LightLevel_Raw_Int <= 255) {
            led.plotBrightness(0, 0, screenBrightness_Hi_DEFAULT_INT)
        }
    }
    if (true) {
        quest_Note_2.quest_Show_String_For_Note_Small_Func(
            "Range: 0 - 2000+"
        )
        sensor_Magnetometer_Force_Raw_Int = Math.round(input.magneticForce(Dimension.Strength))
        if (sensor_Magnetometer_Force_Raw_Int <= 100) {
            led.plotBrightness(2, 0, 0)
        } else if (sensor_Magnetometer_Force_Raw_Int <= 500) {
            led.plotBrightness(2, 0, screenBrightness_LO_INT)
        } else if (sensor_Magnetometer_Force_Raw_Int <= 1000) {
            led.plotBrightness(2, 0, screenBrightness_MI_INT)
        } else {
            led.plotBrightness(2, 0, screenBrightness_Hi_DEFAULT_INT)
        }
    }
    if (true) {
        quest_Note_3.quest_Show_String_For_Note_Small_Func(
            "Not end w/'delimiter' or will create a fake key_value pair at receiving end"
        )
        // network_Message_Str = "" + convertToText(network_GroupChannel_MyBotAndController_Base0_Int) + ":" + convertToText(input.lightLevel()) + ":" + convertToText(input.temperature()) + ":" + convertToText(0)
        // network_Message_Str = "ID:" + convertToText(botGroupChannelNum_Int) + ", TE:" + convertToText(input.temperature()) + ", LI:" + convertToText(input.lightLevel()) + ", CO:" + convertToText(input.compassHeading()) + ", MX:" + convertToText(input.magneticForce(Dimension.X)) + ", MY:" + convertToText(input.magneticForce(Dimension.Y)) + ", MZ:" + convertToText(input.magneticForce(Dimension.Z)) + ", MT:" + convertToText(input.magneticForce(Dimension.Strength))
        network_Message_Str = "#:" + convertToText(network_GroupChannel_MyBotAndController_Base0_Int) + ",L:" + convertToText(sensor_LightLevel_Raw_Int) + ",M:" + convertToText(sensor_Magnetometer_Force_Raw_Int)
        quest_Note_3.quest_Show_String_For_Note_Big_Func(
            "Network_Message Max Length or will be cut off"
        )
        if (network_Message_Str.length > network_Message_LENGTH_MAX_INT) {
            basic.showString("ERROR: Network Message > Max Len.")
        }
        radio.setGroup(network_GroupChannel_ScoreboardServer_BASE0_INT)
        radio.sendString(network_Message_Str)
        radio.setGroup(network_GroupChannel_MyBotAndController_Base0_Int)
        if (_debug_Show_Priority_Hi_Bool) {
            serial.writeLine("> " + network_Message_Str)
        }
    }
})
basic.forever(function () {
    if (_system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_COMMAND_AS_MAIN_MODE_INT) {
        radio.sendString("HiFrom_B")
        // /jwc o roboQuest.quest_ContinueCurrentState_CountdownTimer_Set_Fn(network_HiMessage_Frequency_SEC_INT, quest_Time_Units_Enum.Seconds)
        quest_Timer.quest_Set_ContinueCurrentState_CountdownTimer_Func(network_HiMessage_Frequency_SEC_INT, quest_Time_Units_Enum.Seconds)
    }
})
basic.forever(function () {
    screenBrightness_Heartbeat_Count_Int += screenBrightness_Heartbeat_Count_DELTA_INT
    // * Use '<= and >=' vs '< and >' since do not want to go past boundaries when changing values
    if (screenBrightness_Heartbeat_Count_Int <= screenBrightness_HeartBeat_Count_MIN_INT || screenBrightness_Heartbeat_Count_Int >= screenBrightness_Heartbeat_Count_MAX_INT) {
        screenBrightness_Heartbeat_Count_DELTA_INT = -1 * screenBrightness_Heartbeat_Count_DELTA_INT
    }
})
basic.forever(function () {
    if (_system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_SETUP_INT) {
        screen_ScrollText_Fn("P,u,s,h,A,o,r,B,.")
        basic.showLeds(`
            # # # . .
            # . . # .
            # # # # .
            # . . # .
            # # # . .
            `)
        // * Broken/Fragmented via this repeat loop to allow for the pause to be 'real-time' interruptible.
        // 
        // * 3, 2, 1.5sec
        for (let index = 0; index < 3; index++) {
            if (_system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_SETUP_INT) {
                // /jwc o roboQuest.quest_ContinueCurrentState_CountdownTimer_Set_Fn(0.5, quest_Time_Units_Enum.Seconds)
                quest_Timer.quest_Set_ContinueCurrentState_CountdownTimer_Func(0.5, quest_Time_Units_Enum.Seconds)
            }
        }
    } else if (_system_BotAndController_Mode_Int == _system_BotAndControllelr_Mode_As_SETUP_TO_MAIN_INT) {
        screen_Show_DiagnosticDashboard_Func()
        _system_BotAndController_Mode_Int = _system_BotAndController_Mode_As_COMMAND_AS_MAIN_MODE_INT
    }
})
basic.forever(function () {
    // Setup_Startup: Part 1of1: Setup Software Initializaion
    // * Only 1of1 place that activates Bot
    if (_system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_SETUP_INT) {
        if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
            _system_BotAndController_Mode_Int = _system_BotAndControllelr_Mode_As_SETUP_TO_MAIN_INT
        }
    }
})