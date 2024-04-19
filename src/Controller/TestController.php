<?php

namespace App\Controller;

use App\Form\TestType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
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
			'symfony_form',
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

	/**
	 * This route renders a twig that extends modalBase.html.twig
	 * so it can be called either in a full page or in a modal turbo frame.
	 */
	#[Route(path: '/tailwind_form', name: 'app_test_tailwind_form')]
	public function tailwindForm(): Response
	{
		return $this->render('test/tailwind_form.html.twig');
	}

	/**
	 * This route renders a twig that extends modalBase.html.twig
	 * so it can be called either in a full page or in a modal turbo frame.
	 *
	 * Form theme
	 * Add this config to use the tailwind theme
	 * # config/packages/twig.yaml
	 * twig:
	 *   form_themes: ['tailwind_2_layout.html.twig']
	 *
	 * @see https://symfony.com/doc/current/form/form_themes.html
	 * @see https://github.com/symfony/symfony/blob/7.1/src/Symfony/Bridge/Twig/Resources/views/Form/tailwind_2_layout.html.twig
	 */
	#[Route(path: '/symfony_form', name: 'app_test_symfony_form')]
	public function symfonyForm(Request $request): Response
	{
		$form = $this->createForm(TestType::class, null, [
			'action' => $this->generateUrl('app_test_symfony_form'),
		]);

		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			$test = $form->getData();
			$this->addFlash('info', 'Submit ok !');

			// if ($request->headers->has('turbo-frame')) {
			// 	$stream = $this->renderBlockView('voyage/new.html.twig', 'stream_success', [
			// 		'voyage' => $voyage
			// 	]);
			// 	$this->addFlash('stream', $stream);
			// }
			return $this->redirectToRoute('app_test', [], Response::HTTP_SEE_OTHER);
		}

		return $this->render('test/symfony_form.html.twig', [
			'form' => $form,
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
