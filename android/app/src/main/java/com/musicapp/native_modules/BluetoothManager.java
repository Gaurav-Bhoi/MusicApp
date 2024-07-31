package com.musicapp.native_modules;

import android.Manifest;
import android.annotation.SuppressLint;
import android.bluetooth.BluetoothAdapter;
import android.content.Context;
import android.content.pm.PackageManager;
import android.media.AudioManager;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BluetoothManager extends ReactContextBaseJavaModule {
    private BluetoothAdapter BLUETOOTH_MANAGER = BluetoothAdapter.getDefaultAdapter();
    private AudioManager  mAudioManager;


    public BluetoothManager(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
//        mAudioManager = (AudioManager)reactApplicationContext.getSystemService(Context.AUDIO_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            mAudioManager = reactApplicationContext.getSystemService(AudioManager.class);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "BluetoothManager";
    }

    @SuppressLint("MissingPermission")
    @ReactMethod
        public void handleBluetoothConnectivity(String audioOutputType, Callback callback) {

        switch (audioOutputType){
            case "Speaker":
//                mAudioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
//                mAudioManager.stopBluetoothSco();
//                mAudioManager.setBluetoothScoOn(false);
//                mAudioManager.setSpeakerphoneOn(true);

                mAudioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
                mAudioManager.startBluetoothSco();
                mAudioManager.setBluetoothScoOn(true);
                break;

            case "Bluetooth":
                mAudioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
                mAudioManager.startBluetoothSco();
                mAudioManager.setBluetoothScoOn(true);
                break;

            case "Earphone":
                mAudioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
                mAudioManager.stopBluetoothSco();
                mAudioManager.setBluetoothScoOn(false);
                mAudioManager.setSpeakerphoneOn(false);
                break;
        }
    }

}
