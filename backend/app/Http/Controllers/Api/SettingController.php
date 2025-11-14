<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        return response()->json(Setting::where('is_published', true)->get(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'key'=>'required|string|max:100',
            'value'=>'nullable|json',
        ]);
        $setting = Setting::create($validated);
        return response()->json($setting, 200);
    }

    public function show(Setting $setting)
    {
        return response()->json($setting, 200);
    }

    public function update(Request $request, Setting $setting)
    {
        $validated = $request->validate([

        ]);
        $setting = Setting::update($validated);
        return response()->json($setting, 201);

    }

    public function destroy(Setting $setting)
    {
        $setting->delete();
        return response()->json(null, 204);
    }
}
