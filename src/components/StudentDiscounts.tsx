import React, { useState } from 'react';
import { Percent, ExternalLink, MapPin, Clock, Star, Tag, Gift, ShoppingBag, Utensils, Film, Bus, Palette, Home, CreditCard } from 'lucide-react';
import { useUniversity } from '../contexts/UniversityContext';

interface Discount {
  id: string;
  title: string;
  description: string;
  discount: string;
  category: 'food' | 'entertainment' | 'transportation' | 'shopping' | 'services' | 'housing' | 'culture';
  location?: string;
  hours?: string;
  requirements: string;
  url?: string;
  phone?: string;
  promoCode?: string;
  restrictions?: string;
  popularity: number; // 1-5 stars
  verified: boolean;
  lastUpdated: string;
}

export const StudentDiscounts: React.FC = () => {
  const { selectedUniversity } = useUniversity();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'all', label: 'All Discounts', icon: Gift, color: 'bg-purple-500' },
    { key: 'food', label: 'Food & Dining', icon: Utensils, color: 'bg-orange-500' },
    { key: 'entertainment', label: 'Entertainment', icon: Film, color: 'bg-red-500' },
    { key: 'transportation', label: 'Transportation', icon: Bus, color: 'bg-blue-500' },
    { key: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'bg-green-500' },
    { key: 'culture', label: 'Arts & Culture', icon: Palette, color: 'bg-pink-500' },
    { key: 'services', label: 'Services', icon: CreditCard, color: 'bg-indigo-500' },
    { key: 'housing', label: 'Housing', icon: Home, color: 'bg-yellow-500' }
  ];

  // University-specific discounts
  const universityDiscounts: { [key: string]: Discount[] } = {
    uoft: [
      {
        id: 'uoft-storage-1',
        title: 'Storagehotel - Free Storage',
        description: 'UofT\'s #1 student storage service with pickup, storage, and delivery',
        discount: '2 months FREE storage',
        category: 'services',
        requirements: 'Mention "UTSU" when registering',
        url: 'https://storagehotel.ca/',
        popularity: 5,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'For Large Box storage only'
      },
      {
        id: 'uoft-ski-1',
        title: 'Ski Butlers - Ski Rentals',
        description: 'Ski & snowboard rentals delivered to your location',
        discount: '10% off rentals',
        category: 'entertainment',
        requirements: 'Valid UofT student ID',
        url: 'https://skibutlers.com/portal/UofT',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Valid in North America, France, and Italy'
      },
      {
        id: 'uoft-rom-1',
        title: 'Royal Ontario Museum (ROM)',
        description: 'Canada\'s most visited museum with student perks',
        discount: 'Free Student Tuesdays + 15% off anytime',
        category: 'culture',
        requirements: 'Valid student ID',
        url: 'https://www.rom.on.ca/',
        promoCode: 'MUSEUM15',
        popularity: 5,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: '3rd Tuesday nights free, promo code for other days'
      },
      {
        id: 'uoft-escape-1',
        title: 'Adventure City Games - Escape Rooms',
        description: 'Outdoor escape rooms and team building activities',
        discount: '20% off group bookings',
        category: 'entertainment',
        requirements: 'Minimum 20 people',
        url: 'https://www.adventurecitygames.com/en/toronto/',
        promoCode: 'ESCAPE20UTSU',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: '$25 per person with minimum group size'
      },
      {
        id: 'uoft-ttc-1',
        title: 'TTC Post-Secondary Pass',
        description: 'Discounted monthly transit pass for Toronto students',
        discount: '$27.85/month savings',
        category: 'transportation',
        location: 'Bathurst Subway Station',
        requirements: 'T-Card + proof of full-time enrollment from ACORN',
        popularity: 5,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: '$128.15/month vs $156/month regular. $5.25 for ID card'
      },
      {
        id: 'uoft-cineplex-1',
        title: 'Cineplex Movie Passes',
        description: 'Discounted movie tickets for Cineplex theatres',
        discount: 'Admit One: $14.50, Great Escape: $40.00',
        category: 'entertainment',
        location: 'UTSU Welcome Desk, Student Commons Room 164',
        hours: 'Monday-Friday, 10am-4pm',
        requirements: 'Cash or debit only, limit 6 passes per person',
        popularity: 5,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Non-refundable, $1.50 online booking fee waived in person'
      },
      {
        id: 'uoft-citymarket-1',
        title: 'Maisie\'s Independent City Market',
        description: 'Grocery discount at Manulife Centre (Bay & Bloor)',
        discount: '10% off purchases over $50',
        category: 'food',
        location: 'Manulife Centre, Bay & Bloor',
        phone: '416-923-8831',
        requirements: 'Show student ID on Tuesdays only',
        popularity: 3,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Tuesdays only'
      },
      {
        id: 'uoft-ago-1',
        title: 'Art Gallery of Ontario (AGO)',
        description: 'Annual pass for unlimited access to collections and exhibitions',
        discount: 'FREE for ages 14-25, $35 for 26+',
        category: 'culture',
        requirements: 'Valid age verification',
        url: 'https://ago.ca/',
        popularity: 5,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Full year unlimited access'
      },
      {
        id: 'uoft-evviva-1',
        title: 'Evviva Breakfast and Lunch',
        description: 'Breakfast and lunch restaurant chain',
        discount: '15% off food',
        category: 'food',
        hours: 'Monday-Friday, 7am-4pm',
        requirements: 'Show UofT student ID',
        url: 'https://evviva.ca/',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Valid at any Evviva location during specified hours'
      },
      {
        id: 'uoft-imagine-1',
        title: 'Imagine Cinemas',
        description: 'Independent movie theatre chain',
        discount: 'Movie tickets for $9.89',
        category: 'entertainment',
        location: 'UTSU Community Hub, Student Commons',
        requirements: 'Purchase from Community Hub',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Physical tickets only, may require T-Card at entry'
      },
      {
        id: 'uoft-ripleys-1',
        title: 'Ripley\'s Aquarium',
        description: 'Downtown Toronto aquarium experience',
        discount: '$12 savings - $32 vs $44 retail',
        category: 'entertainment',
        location: 'UTSU Community Hub, Student Commons',
        requirements: 'Purchase physical tickets from Community Hub',
        popularity: 5,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Express Anytime vouchers, may require T-Card at entry'
      },
      {
        id: 'uoft-choice-1',
        title: 'Choice Hotels',
        description: 'Over 7,100 hotels and inns worldwide',
        discount: '10% off hotel stays',
        category: 'services',
        requirements: 'Use Student Hotel Discount ID: 00324220',
        url: 'https://www.choicehotels.com/',
        popularity: 3,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Worldwide locations'
      },
      {
        id: 'uoft-isic-1',
        title: 'International Student Identity Card (ISIC)',
        description: 'Globally recognized student ID with worldwide discounts',
        discount: 'FREE virtual ISIC card',
        category: 'services',
        requirements: 'Full-time student status verification',
        url: 'https://www.isic.org/',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Must be currently studying full-time'
      },
      {
        id: 'uoft-places4students-1',
        title: 'Places4Students Housing',
        description: 'Find rentals, rooms, and roommates',
        discount: 'FREE housing search services',
        category: 'housing',
        requirements: 'Student status',
        url: 'https://www.places4students.com/',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'All services free for students'
      },
      {
        id: 'uoft-rexall-1',
        title: 'Rexall Pharmacy',
        description: 'Pharmacy and health products',
        discount: '20% off Rexall exclusive brands',
        category: 'shopping',
        requirements: 'Student ID',
        url: 'https://www.rexall.ca/',
        popularity: 3,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Regular-priced Rexall exclusive brands only'
      }
    ],
    waterloo: [
      {
        id: 'waterloo-transit-1',
        title: 'Grand River Transit (GRT)',
        description: 'Local transit system for Waterloo Region',
        discount: 'Student monthly pass $70 vs $109 regular',
        category: 'transportation',
        requirements: 'Valid WatCard and student status',
        popularity: 5,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Must maintain full-time student status'
      },
      {
        id: 'waterloo-cineplex-1',
        title: 'Cineplex Student Pricing',
        description: 'Discounted movie tickets at local Cineplex theatres',
        discount: 'Student pricing available',
        category: 'entertainment',
        requirements: 'Valid student ID',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Varies by location and showtime'
      },
      {
        id: 'waterloo-rec-1',
        title: 'City of Waterloo Recreation',
        description: 'Municipal recreation facilities and programs',
        discount: 'Student rates on programs and facilities',
        category: 'entertainment',
        requirements: 'Proof of student status',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Varies by program'
      },
      {
        id: 'waterloo-food-1',
        title: 'Local Restaurant Discounts',
        description: 'Various restaurants near campus offer student discounts',
        discount: '10-15% off with student ID',
        category: 'food',
        location: 'University Avenue and King Street area',
        requirements: 'Valid WatCard or student ID',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Participating locations only'
      },
      {
        id: 'waterloo-software-1',
        title: 'Student Software Discounts',
        description: 'Discounted software through OnTheHub and other vendors',
        discount: 'Up to 90% off professional software',
        category: 'services',
        requirements: 'Valid student email and verification',
        url: 'https://uwaterloo.onthehub.com/',
        popularity: 5,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Educational use only'
      }
    ],
    queens: [
      {
        id: 'queens-transit-1',
        title: 'Kingston Transit',
        description: 'Local transit system for Kingston',
        discount: 'Student monthly pass discounts',
        category: 'transportation',
        requirements: 'Valid Queen\'s student ID',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Must be enrolled student'
      },
      {
        id: 'queens-entertainment-1',
        title: 'Local Entertainment Venues',
        description: 'Various entertainment venues in Kingston offer student discounts',
        discount: '10-20% off admission',
        category: 'entertainment',
        location: 'Downtown Kingston',
        requirements: 'Valid Queen\'s student ID',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Participating venues only'
      },
      {
        id: 'queens-food-1',
        title: 'Kingston Restaurant Discounts',
        description: 'Local restaurants offering student pricing',
        discount: '10-15% off with student ID',
        category: 'food',
        location: 'Princess Street and downtown Kingston',
        requirements: 'Valid Queen\'s student ID',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Participating restaurants only'
      },
      {
        id: 'queens-culture-1',
        title: 'Kingston Cultural Venues',
        description: 'Museums and cultural sites in Kingston',
        discount: 'Student admission rates',
        category: 'culture',
        requirements: 'Valid student ID',
        popularity: 3,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Varies by venue'
      }
    ],
    ubc: [
      {
        id: 'ubc-transit-1',
        title: 'TransLink U-Pass BC',
        description: 'Unlimited transit access in Metro Vancouver',
        discount: 'Significant savings vs regular monthly pass',
        category: 'transportation',
        requirements: 'Full-time UBC student status',
        popularity: 5,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Automatically included in student fees'
      },
      {
        id: 'ubc-rec-1',
        title: 'Vancouver Recreation Centres',
        description: 'City of Vancouver recreation facilities',
        discount: 'Student rates on memberships and programs',
        category: 'entertainment',
        requirements: 'Valid UBC student ID',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Varies by facility'
      },
      {
        id: 'ubc-culture-1',
        title: 'Vancouver Museums and Galleries',
        description: 'Various cultural institutions offer student discounts',
        discount: 'Student admission rates',
        category: 'culture',
        location: 'Vancouver area',
        requirements: 'Valid student ID',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Participating venues only'
      },
      {
        id: 'ubc-food-1',
        title: 'Vancouver Restaurant Discounts',
        description: 'Local restaurants near campus and downtown',
        discount: '10-15% off with student ID',
        category: 'food',
        location: 'UBC area and downtown Vancouver',
        requirements: 'Valid UBC student ID',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Participating restaurants only'
      }
    ],
    mcgill: [
      {
        id: 'mcgill-transit-1',
        title: 'STM Student Discounts',
        description: 'Montreal public transit student pricing',
        discount: 'Reduced monthly pass rates',
        category: 'transportation',
        requirements: 'Valid McGill student ID and OPUS card',
        popularity: 5,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Must be full-time student'
      },
      {
        id: 'mcgill-culture-1',
        title: 'Montreal Museums',
        description: 'Various museums in Montreal offer student discounts',
        discount: 'Student admission rates',
        category: 'culture',
        location: 'Montreal area',
        requirements: 'Valid student ID',
        popularity: 5,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Participating museums only'
      },
      {
        id: 'mcgill-food-1',
        title: 'Montreal Restaurant Discounts',
        description: 'Local restaurants offering student pricing',
        discount: '10-15% off with student ID',
        category: 'food',
        location: 'Downtown Montreal and Plateau',
        requirements: 'Valid McGill student ID',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Participating restaurants only'
      },
      {
        id: 'mcgill-entertainment-1',
        title: 'Montreal Entertainment Venues',
        description: 'Theatres, cinemas, and entertainment venues',
        discount: 'Student pricing available',
        category: 'entertainment',
        location: 'Montreal area',
        requirements: 'Valid student ID',
        popularity: 4,
        verified: true,
        lastUpdated: '2024-01-15',
        restrictions: 'Varies by venue'
      }
    ]
  };

  const currentDiscounts = selectedUniversity ? universityDiscounts[selectedUniversity.id] || [] : [];

  const filteredDiscounts = currentDiscounts.filter(discount => {
    const matchesCategory = selectedCategory === 'all' || discount.category === selectedCategory;
    const matchesSearch = discount.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discount.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.key === category);
    return categoryData ? categoryData.icon : Gift;
  };

  const getCategoryColor = (category: string) => {
    const categoryData = categories.find(c => c.key === category);
    return categoryData ? categoryData.color : 'bg-gray-500';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (!selectedUniversity) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="text-center">
          <Percent className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Student Discounts</h3>
          <p className="text-gray-600">Select your university to see available student discounts and perks</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
          <Percent className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Student Discounts & Perks</h3>
          <p className="text-sm text-gray-600">Exclusive deals for {selectedUniversity.shortName} students</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search discounts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.key
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Discounts Grid */}
      <div className="space-y-4">
        {filteredDiscounts.map((discount) => {
          const Icon = getCategoryIcon(discount.category);
          const categoryColor = getCategoryColor(discount.category);
          
          return (
            <div key={discount.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 ${categoryColor} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{discount.title}</h4>
                      {discount.verified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{discount.description}</p>
                    <div className="flex items-center space-x-1 mb-2">
                      {renderStars(discount.popularity)}
                      <span className="text-xs text-gray-500 ml-1">({discount.popularity}/5)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{discount.discount}</div>
                  <div className="text-xs text-gray-500">Updated: {discount.lastUpdated}</div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <Tag className="h-4 w-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-700"><strong>Requirements:</strong> {discount.requirements}</span>
                </div>
                
                {discount.location && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-700"><strong>Location:</strong> {discount.location}</span>
                  </div>
                )}
                
                {discount.hours && (
                  <div className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-700"><strong>Hours:</strong> {discount.hours}</span>
                  </div>
                )}
                
                {discount.promoCode && (
                  <div className="flex items-start space-x-2">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Promo Code: {discount.promoCode}
                    </span>
                  </div>
                )}
                
                {discount.restrictions && (
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    <strong>Restrictions:</strong> {discount.restrictions}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 mt-4">
                {discount.url && (
                  <a
                    href={discount.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Visit Website</span>
                  </a>
                )}
                
                {discount.phone && (
                  <a
                    href={`tel:${discount.phone}`}
                    className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <span>📞 Call</span>
                  </a>
                )}
                
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Share Discount
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDiscounts.length === 0 && (
        <div className="text-center py-8">
          <Percent className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Discounts Found</h3>
          <p className="text-gray-600">Try adjusting your search or category filter</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{currentDiscounts.length}</div>
            <div className="text-sm text-gray-600">Total Discounts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {currentDiscounts.filter(d => d.category === 'food').length}
            </div>
            <div className="text-sm text-gray-600">Food & Dining</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {currentDiscounts.filter(d => d.category === 'entertainment').length}
            </div>
            <div className="text-sm text-gray-600">Entertainment</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {currentDiscounts.filter(d => d.verified).length}
            </div>
            <div className="text-sm text-gray-600">Verified Deals</div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Discounts and offers may change without notice. Always verify current promotions with the vendor. 
          Some offers require valid student ID and proof of enrollment at {selectedUniversity.name}.
        </p>
      </div>
    </div>
  );
};