<section class="flex items-center justify-center min-h-screen bg-gray-900 py-16">
  <div class="max-w-md w-full bg-gray-800 rounded-3xl p-8 border border-orange-500/20 shadow-lg shadow-orange-500/10">
      <div class="text-center mb-8">
          <div class="inline-block p-3 bg-orange-500/10 rounded-xl border border-orange-500/30 mb-4">
              <i class="fas fa-user-shield text-3xl text-orange-400"></i>
          </div>
          <h2 class="text-4xl font-bold mb-2 text-white">Connexion <span class="text-orange-400">Gestionnaire</span></h2>
          <p class="text-gray-400 text-lg">Accédez à votre tableau de bord</p>
      </div>
      <form class="space-y-6" action="">
          <div>
              <label for="username" class="block text-orange-400 font-semibold mb-2">Nom d'utilisateur</label>
              <input type="text" id="username" name="username" placeholder="Votre nom d'utilisateur" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none">
          </div>
          <div>
              <label for="password" class="block text-orange-400 font-semibold mb-2">Mot de passe</label>
              <input type="password" id="password" name="password" placeholder="Votre mot de passe" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none">
          </div>
          <button type="submit"  class="w-full py-4 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-colors duration-300 shadow-lg shadow-orange-500/25">
              <i class="fas fa-sign-in-alt mr-2"></i> Se Connecter
          </button>
      </form>
      <p class="text-center text-gray-500 text-sm mt-6">
          <a href="#" class="hover:text-orange-400 transition-colors duration-300">Mot de passe oublié?</a>
      </p>
  </div>
</section>
