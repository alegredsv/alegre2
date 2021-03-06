<?php

namespace AlegreBill\Http\Controllers\Api;

use AlegreBill\Criteria\FindByLikeAgencyCriteria;
use AlegreBill\Criteria\FindByNameCriteria;
use AlegreBill\Http\Controllers\Controller;
use AlegreBill\Http\Controllers\Response;
use Illuminate\Http\Request;

use AlegreBill\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use AlegreBill\Http\Requests\BankAccountCreateRequest;
use AlegreBill\Http\Requests\BankAccountUpdateRequest;
use AlegreBill\Repositories\BankAccountRepository;



class BankAccountsController extends Controller
{

    /**
     * @var BankAccountRepository
     */
    protected $repository;



    public function __construct(BankAccountRepository $repository)
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
//        $this->repository->pushCriteria(new FindByNameCriteria('Fritschside'))
//            ->pushCriteria(new FindByLikeAgencyCriteria('9'));
        $bankAccounts = $this->repository->paginate();
        return $bankAccounts;


    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  BankAccountCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(BankAccountCreateRequest $request)
    {

       $bankAccount = $this->repository->create($request->all());
       return response()->json($bankAccount,201);
    }


    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $bankAccount = $this->repository->find($id);
        return response()->json($bankAccount);
    }


      /**
     * Update the specified resource in storage.
     *
     * @param  BankAccountUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(BankAccountUpdateRequest $request, $id)
    {
       $bankAccount = $this->repository->update($request->all(),$id);
       return response()->json($bankAccount);
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
        $this->repository->delete($id);
        return response()->json([],204);
    }
}
