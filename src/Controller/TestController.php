<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/test')]
class TestController extends AbstractController
{
	#[Route('/', name: 'app_test')]
	public function index(): Response
	{
		// List of test with 'app_test_' path prefix
		$items = [
			'tailwind_form',
			'tailwind_standalone_modal',
			'toast',
		];

		return $this->render('test/index.html.twig', [
			'items' => $items,
		]);
	}

	#[Route(path: '/tailwind_standalone_modal', name: 'app_test_tailwind_standalone_modal')]
	public function tailwindModal(): Response
	{
		return $this->render('test/tailwind_standalone_modal.html.twig');
	}

	#[Route(path: '/tailwind_form', name: 'app_test_tailwind_form')]
	public function tailwindForm(): Response
	{
		return $this->render('test/tailwind_form.html.twig', [
			'modalTitle' => 'tailwind.form.title',
		]);
	}

	#[Route(path: '/toast', name: 'app_test_toast')]
	public function toast(): Response
	{
		$types = explode('|', 'error|success|info');
		foreach ($types as $type) {
			$message = sprintf('Message content for type: %s|notrans', $type);
			$this->addFlash($type, $message);
		}

		return $this->render('test/toast.html.twig', [
			'types' => $types,
		]);
	}
}
