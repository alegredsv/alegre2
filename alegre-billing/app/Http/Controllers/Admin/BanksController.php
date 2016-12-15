<?php

namespace AlegreBill\Http\Controllers\Admin;

use AlegreBill\Http\Controllers\Controller;
use AlegreBill\Http\Controllers\Response;


use AlegreBill\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use AlegreBill\Http\Requests\BankCreateRequest;
use AlegreBill\Http\Requests\BankUpdateRequest;
use AlegreBill\Repositories\BankRepository;



class BanksController extends Controller
{

    /**
     * @var BankRepository
     */
    protected $repository;



    public function __construct(BankRepository $repository)
    {
        $this->repository = $repository;

    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $banks = $this->repository->paginate(5);

        /*if (request()->wantsJson()) {
            return response()->json([
                'data' => $banks,
            ]);
        }*/

        return view('admin.banks.index', compact('banks'));
    }

    public function create(){
        return view('admin.banks.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  BankCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(BankCreateRequest $request)
    {

       // try {

           // $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);
            $data = $request->all();
            $data['logo'] = md5(time()).'.jpeg';
             $this->repository->create($data);



//            if ($request->wantsJson()) {
//
//                $response = [
//                    'message' => 'Bank created.',
//                    'data'    => $bank->toArray(),
//                ];
//                return response()->json($response);
//            }

            return redirect()->route("admin.banks.index");
//        } catch (ValidatorException $e) {
//            if ($request->wantsJson()) {
//                return response()->json([
//                    'error'   => true,
//                    'message' => $e->getMessageBag()
//                ]);
//            }
//
//            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
//        }
    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $bank = $this->repository->find($id);

        return view('admin.banks.edit', compact('bank'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  BankUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(BankUpdateRequest $request, $id)
    {

      //  try {

        //    $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

             $this->repository->update($request->all(),$id);



//            if ($request->wantsJson()) {
//                $response = [
//                    'message' => 'Bank updated.',
//                    'data'    => $bank->toArray(),
//                ];
//                return response()->json($response);
//            }

            return redirect()->route('admin.banks.index');
//        } catch (ValidatorException $e) {
//
//            if ($request->wantsJson()) {
//
//                return response()->json([
//                    'error'   => true,
//                    'message' => $e->getMessageBag()
//                ]);
//            }
//
//            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
//        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        dd($id);
        $this->repository->delete($id);
/*
        if (request()->wantsJson()) {

            return response()->json([
                'message' => 'Bank deleted.',
                'deleted' => $deleted,
            ]);
        }*/

        return redirect()->route('admin.banks.index');
    }
}
