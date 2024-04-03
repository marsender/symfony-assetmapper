<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class TestController extends AbstractController
{
	#[Route('/test', name: 'app_test')]
	public function index(): Response
	{
		// List of test with 'app_test_' path prefix
		$items = [
			'flowbite_modal',
			'flowbite_form',
		];

		return $this->render('test/index.html.twig', [
			'items' => $items,
		]);
	}

	#[Route(path: '/flowbite_modal', name: 'app_test_flowbite_modal')]
	public function flowbiteModal(): Response
	{
		return $this->render('test/flowbite_modal.html.twig');
	}

	#[Route(path: '/flowbite_form', name: 'app_test_flowbite_form')]
	public function flowbiteForm(): Response
	{
		return $this->render('test/flowbite_form.html.twig');
	}
}
