<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json(['data' => $request->user()->addresses()->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $address = $request->user()->addresses()->create($this->validatedData($request));
        $this->makeDefaultIfFirst($address);

        return response()->json(['message' => 'Address saved.', 'data' => $address->fresh()], 201);
    }

    public function update(Request $request, Address $address): JsonResponse
    {
        abort_unless($address->user_id === $request->user()->id, 404);
        $address->update($this->validatedData($request));

        return response()->json(['message' => 'Address updated.', 'data' => $address->fresh()]);
    }

    public function destroy(Request $request, Address $address): JsonResponse
    {
        abort_unless($address->user_id === $request->user()->id, 404);
        $address->delete();

        return response()->json(['message' => 'Address removed.']);
    }

    private function validatedData(Request $request): array
    {
        return $request->validate([
            'label' => ['required', 'string', 'max:80'],
            'recipient_name' => ['required', 'string', 'max:190'],
            'company_name' => ['nullable', 'string', 'max:190'],
            'line1' => ['required', 'string', 'max:190'],
            'line2' => ['nullable', 'string', 'max:190'],
            'city' => ['required', 'string', 'max:100'],
            'state' => ['nullable', 'string', 'max:100'],
            'postal_code' => ['nullable', 'string', 'max:30'],
            'country' => ['required', 'string', 'max:100'],
            'phone' => ['nullable', 'string', 'max:40'],
            'is_default' => ['nullable', 'boolean'],
        ]);
    }

    private function makeDefaultIfFirst(Address $address): void
    {
        if ($address->user->addresses()->count() === 1) {
            $address->update(['is_default' => true]);
        }
    }
}
