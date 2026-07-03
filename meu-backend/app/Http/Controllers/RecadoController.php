<?php

namespace App\Http\Controllers;

use App\Models\Recado;
use Illuminate\Http\Request;

class RecadoController extends Controller
{
    // Listar recados do usuário logado
    public function index(Request $request)
    {
        return $request->user()->recados()->latest()->get();
    }

    // Criar recado
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|max:255',
            'texto' => 'required'
        ]);

        $recado = Recado::create([
            'titulo' => $request->titulo,
            'texto' => $request->texto,
            'user_id' => $request->user()->id
        ]);

        return response()->json($recado, 201);
    }

    // Excluir recado
    public function destroy(Request $request, $id)
    {
        $recado = Recado::where('user_id', $request->user()->id)
                        ->findOrFail($id);

        $recado->delete();

        return response()->json([
            'message' => 'Recado excluído com sucesso.'
        ]);
    }
}